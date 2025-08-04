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

      let { files: changedFiles, commits } = data.data;

      log.debug("compareCommits, base:", context.payload.pull_request.base.sha, "head:", context.payload.pull_request.head.sha)
      log.debug("compareCommits.commits:", commits)
      log.debug("compareCommits.files", changedFiles)

      if (context.payload.action === 'synchronize' && commits.length >= 2) {
        const {
          data: { files },
        } = await context.octokit.repos.compareCommits({
          owner: repo.owner,
          repo: repo.repo,
          base: commits[commits.length - 2].sha,
          head: commits[commits.length - 1].sha,
        });

        changedFiles = files
      }

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
          if (!res.lgtm && !!res.review_comment) {
            ress.push({
              path: file.filename,
              body: res.review_comment,
              position: patch.split('\n').length - 1,
            })
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
          commit_id: commits[commits.length - 1].sha,
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