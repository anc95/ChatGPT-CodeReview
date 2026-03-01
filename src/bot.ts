import { Context, Probot } from 'probot';
import { minimatch } from 'minimatch'

import { Chat } from './chat.js';
import log from 'loglevel';

const OPENAI_API_KEY = 'OPENAI_API_KEY';
const MAX_PATCH_COUNT = process.env.MAX_PATCH_LENGTH
  ? +process.env.MAX_PATCH_LENGTH
  : Infinity;

export const robot = (app: Probot) => {
  const loadChat = async (context: Context) => {
    if (process.env.USE_GITHUB_MODELS === 'true' && process.env.GITHUB_TOKEN) {
      return new Chat(process.env.GITHUB_TOKEN);
    }

    if (process.env.OPENAI_API_KEY) {
      return new Chat(process.env.OPENAI_API_KEY);
    }

    const repo = context.repo();

    try {
      const { data } = (await context.octokit.request(
        'GET /repos/{owner}/{repo}/actions/variables/{name}',
        {
          owner: repo.owner,
          repo: repo.repo,
          name: OPENAI_API_KEY,
        }
      )) as any;

      if (!data?.value) {
        return null;
      }

      return new Chat(data.value);
    } catch {
      await context.octokit.issues.createComment({
        repo: repo.repo,
        owner: repo.owner,
        issue_number: context.pullRequest().pull_number,
        body: `Seems you are using me but didn't get OPENAI_API_KEY seted in Variables/Secrets for this repo. you could follow [readme](https://github.com/anc95/ChatGPT-CodeReview) for more information`,
      });
      return null;
    }
  };

  app.on(
    ['pull_request.opened', 'pull_request.synchronize'],
    async (context) => {
      const repo = context.repo();
      const chat = await loadChat(context);

      if (!chat) {
        log.info('Chat initialized failed');
        return 'no chat';
      }

      const pull_request = context.payload.pull_request;

      log.debug('pull_request:', pull_request);

      if (
        pull_request.state === 'closed' ||
        pull_request.locked
      ) {
        log.info('invalid event payload');
        return 'invalid event payload';
      }

      const target_label = process.env.TARGET_LABEL;
      if (
        target_label &&
        (!pull_request.labels?.length ||
          pull_request.labels.every((label) => label.name !== target_label))
      ) {
        log.info('no target label attached');
        return 'no target label attached';
      }

      const data = await context.octokit.repos.compareCommits({
        owner: repo.owner,
        repo: repo.repo,
        base: context.payload.pull_request.base.sha,
        head: context.payload.pull_request.head.sha,
      });

      let { files: changedFiles } = data.data;

      if (context.payload.action === 'synchronize') {
        // Try to detect the last commit we reviewed (by looking for our previous review)
        try {
          const reviewsResp = await context.octokit.pulls.listReviews({
            owner: repo.owner,
            repo: repo.repo,
            pull_number: context.pullRequest().pull_number,
          });

          const reviews = reviewsResp.data || [];
          // Find the most recent review created by this bot (we mark our reviews with a body)
          const botReview = reviews
            .slice()
            .reverse()
            .find((r) => r.body && (r.body.startsWith('Code review by ChatGPT') || r.body.startsWith('LGTM')));

          if (botReview?.commit_id) {
            const {
              data: { files },
            } = await context.octokit.repos.compareCommits({
              owner: repo.owner,
              repo: repo.repo,
              base: botReview.commit_id,
              head: context.payload.pull_request.head.sha,
            });

            changedFiles = files;
          } else if (context.payload.before) {
            // Use the 'before' SHA from the synchronize event to capture
            // all commits in the push, not just the last one.
            const {
              data: { files },
            } = await context.octokit.repos.compareCommits({
              owner: repo.owner,
              repo: repo.repo,
              base: context.payload.before,
              head: context.payload.pull_request.head.sha,
            });

            changedFiles = files;
          }
        } catch (err) {
          log.debug('failed to detect previous bot review, falling back', err);
          if (context.payload.before) {
            const {
              data: { files },
            } = await context.octokit.repos.compareCommits({
              owner: repo.owner,
              repo: repo.repo,
              base: context.payload.before,
              head: context.payload.pull_request.head.sha,
            });

            changedFiles = files;
          }
        }
      }

      log.debug('changedFiles:', changedFiles);
      log.debug

      const ignoreList = (process.env.IGNORE || process.env.ignore || '')
          .split('\n')
          .filter((v) => v !== '');
      const ignorePatterns = (process.env.IGNORE_PATTERNS || '').split(',').filter((v) => Boolean(v.trim()));
      const includePatterns = (process.env.INCLUDE_PATTERNS || '').split(',').filter((v) => Boolean(v.trim()));

      log.debug('ignoreList:', ignoreList);
      log.debug('ignorePatterns:', ignorePatterns);
      log.debug('includePatterns:', includePatterns);

      changedFiles = changedFiles?.filter(
        (file) => {
          const url = new URL(file.contents_url)
          const pathname = decodeURIComponent(url.pathname)
          // if includePatterns is not empty, only include files that match the pattern
          if (includePatterns.length) {
            return matchPatterns(includePatterns, pathname)
          }

          if (ignoreList.includes(file.filename)) {
            return false;
          }

          // if ignorePatterns is not empty, ignore files that match the pattern
          if (ignorePatterns.length) {
            return !matchPatterns(ignorePatterns, pathname)
          }

          return true
      })

      if (!changedFiles?.length) {
        log.info('no change found');
        return 'no change';
      }

      console.time('gpt cost');

      const ress = [];

      for (let i = 0; i < changedFiles.length; i++) {
        const file = changedFiles[i];
        const patch = file.patch || '';

        if (file.status !== 'modified' && file.status !== 'added') {
          continue;
        }

        if (!patch || patch.length > MAX_PATCH_COUNT) {
          log.info(
            `${file.filename} skipped caused by its diff is too large`
          );
          continue;
        }
        try {
          const res = await chat?.codeReview(patch);
          // res can be a single review or an array of reviews (one for each hunk)
          const reviews = Array.isArray(res) ? res : [res];
          
          for (const review of reviews) {
            if (!review.lgtm && !!review.review_comment) {
              let line: number | undefined;
              let side: 'LEFT' | 'RIGHT' = 'RIGHT';

              // Extract line number from hunk header if available
              if (review.hunk_header) {
                const c = review.hunk_header.match(/\+\s*(\d+),(\d+)/);
                if (c) {
                  const [, start, count] = c;
                  line = Number(start) + Number(count) - 1;
                }
                else {
                  log.error(`Failed to parse hunk header: ${review.hunk_header}`);
                  continue;
                }
              }

              ress.push({
                path: file.filename,
                body: review.review_comment,
                line: line,
                side: side,
              })
            }
          }
        } catch (e) {
          log.info(`review ${file.filename} failed`, e);
          throw e;
        }
      }
      try {
        await context.octokit.pulls.createReview({
          repo: repo.repo,
          owner: repo.owner,
          pull_number: context.pullRequest().pull_number,
          body: ress.length ? "Code review by ChatGPT" : "LGTM 👍",
          event: 'COMMENT',
          commit_id: context.payload.pull_request.head.sha,
          comments: ress,
        });
      } catch (e) {
        log.info(`Failed to create review`, e);
        throw e;
      }

      console.timeEnd('gpt cost');
      log.info(
        'successfully reviewed',
        context.payload.pull_request.html_url
      );

      return 'success';
    }
  );
};

const matchPatterns = (patterns: string[], path: string) => {
  return patterns.some((pattern) => {
    try {
      return minimatch(path, pattern.startsWith('/') ? "**" + pattern : pattern.startsWith("**") ? pattern : "**/" + pattern);
    } catch {
      // if the pattern is not a valid glob pattern, try to match it as a regular expression
      try {
        return new RegExp(pattern).test(path);
      } catch (e) {
        return false;
      }
    }
  })
}