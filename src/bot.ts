import { Context, Probot } from 'probot';
import { minimatch } from 'minimatch'

import { Chat } from './chat.js';
import log from 'loglevel';

const OPENAI_API_KEY = 'OPENAI_API_KEY';
const COMPARE_FILES_LIMIT = 300;
const REVIEW_MARKER = '<!-- chatgpt-code-review -->';
const MAX_PATCH_COUNT = process.env.MAX_PATCH_LENGTH
  ? +process.env.MAX_PATCH_LENGTH
  : Infinity;

type PullRequestContext = Context<
  'pull_request.opened' | 'pull_request.synchronize'
>;

const parseHunkHeader = (hunkHeader?: string) => {
  if (!hunkHeader) {
    return null;
  }

  const match = hunkHeader.trim().match(
    /^@@\s+-\s*(\d+)(?:,(\d+))?\s+\+\s*(\d+)(?:,(\d+))?\s+@@/
  );
  if (!match) {
    return null;
  }

  const [, oldStartValue, oldCountValue, newStartValue, newCountValue] = match;
  const oldStart = Number(oldStartValue);
  const oldCount = oldCountValue === undefined ? 1 : Number(oldCountValue);
  const newStart = Number(newStartValue);
  const newCount = newCountValue === undefined ? 1 : Number(newCountValue);

  return { oldStart, oldCount, newStart, newCount };
};

export const getReviewCommentLocation = (hunkHeader?: string) => {
  const range = parseHunkHeader(hunkHeader);
  if (!range) {
    return null;
  }

  const { oldStart, oldCount, newStart, newCount } = range;

  if (newCount > 0) {
    return {
      line: newStart + newCount - 1,
      side: 'RIGHT' as const,
    };
  }

  if (oldCount > 0) {
    return {
      line: oldStart + oldCount - 1,
      side: 'LEFT' as const,
    };
  }

  return null;
};

export const isHunkHeaderInPatch = (
  hunkHeader: string | undefined,
  patch: string
) => {
  const expectedRange = parseHunkHeader(hunkHeader);
  if (!expectedRange) {
    return false;
  }

  return patch.split('\n').some((line) => {
    if (!line.startsWith('@@')) {
      return false;
    }
    const actualRange = parseHunkHeader(line);
    return (
      actualRange?.oldStart === expectedRange.oldStart &&
      actualRange.oldCount === expectedRange.oldCount &&
      actualRange.newStart === expectedRange.newStart &&
      actualRange.newCount === expectedRange.newCount
    );
  });
};

export const createInlineReviewComment = (
  path: string,
  body: string,
  hunkHeader: string | undefined,
  patch: string
) => {
  const location = getReviewCommentLocation(hunkHeader);
  if (!location || !isHunkHeaderInPatch(hunkHeader, patch)) {
    return null;
  }

  return {
    path,
    body,
    line: location.line,
    side: location.side,
  };
};

export const createReviewBody = (
  hasInlineComments: boolean,
  bodyComments: string[]
) => {
  const heading =
    hasInlineComments || bodyComments.length
      ? 'Code review by ChatGPT'
      : 'LGTM 👍';
  return [heading, ...bodyComments, REVIEW_MARKER].join('\n\n');
};

export const getChangedFiles = async (context: PullRequestContext) => {
  const repo = context.repo();
  const pullRequestFiles = await context.octokit.paginate(
    context.octokit.pulls.listFiles,
    {
      owner: repo.owner,
      repo: repo.repo,
      pull_number: context.pullRequest().pull_number,
      per_page: 100,
    }
  );

  if (context.payload.action !== 'synchronize') {
    return pullRequestFiles;
  }

  let comparisonBase: string | undefined;

  try {
    const reviews = await context.octokit.paginate(
      context.octokit.pulls.listReviews,
      {
        owner: repo.owner,
        repo: repo.repo,
        pull_number: context.pullRequest().pull_number,
        per_page: 100,
      }
    );
    const botReview = reviews
      .slice()
      .reverse()
      .find((r) =>
        r.user?.type === 'Bot' &&
        r.body?.includes(REVIEW_MARKER)
      );

    if (botReview) {
      if (!botReview.commit_id) {
        return pullRequestFiles;
      }
      comparisonBase = botReview.commit_id;
    } else {
      const hasLegacyReview = reviews.some(
        (r) =>
          r.user?.type === 'Bot' &&
          r.body &&
          (r.body.startsWith('Code review by ChatGPT') ||
            r.body.startsWith('LGTM'))
      );
      if (hasLegacyReview) {
        return pullRequestFiles;
      }
    }
  } catch (err) {
    log.debug('failed to detect previous bot review', err);
    return pullRequestFiles;
  }

  if (!comparisonBase) {
    comparisonBase = context.payload.before;
  }

  if (!comparisonBase) {
    return pullRequestFiles;
  }

  try {
    const { data } = await context.octokit.repos.compareCommits({
      owner: repo.owner,
      repo: repo.repo,
      base: comparisonBase,
      head: context.payload.pull_request.head.sha,
    });

    if (data.status === 'identical') {
      return [];
    }

    if (data.status === 'ahead') {
      if (!data.files) {
        log.debug(
          'commit comparison omitted files; using the full pull request diff'
        );
        return pullRequestFiles;
      }

      const comparisonFiles = data.files;
      if (comparisonFiles.length >= COMPARE_FILES_LIMIT) {
        log.debug(
          'commit comparison reached the GitHub file limit; using the full pull request diff'
        );
        return pullRequestFiles;
      }

      const changedFilenames = new Set(
        comparisonFiles.map((file) => file.filename)
      );
      return pullRequestFiles.filter((file) =>
        changedFilenames.has(file.filename)
      );
    }

    log.debug(
      `commit comparison from ${comparisonBase} is ${data.status}; using the full pull request diff`
    );
  } catch (err) {
    log.debug(`failed to compare commits from ${comparisonBase}`, err);
  }

  return pullRequestFiles;
};

export const robot = (app: Probot) => {
  if (process.env.GITHUB_ACTIONS === 'true') {
    app.onError(() => {
      process.exitCode = 1;
    });
  }

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

      let changedFiles = await getChangedFiles(context);

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
      const bodyComments = [];

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
              const inlineComment = createInlineReviewComment(
                file.filename,
                review.review_comment,
                review.hunk_header,
                patch
              );
              if (!inlineComment) {
                const filename = file.filename.replace(/`/g, '\\`');
                bodyComments.push(
                  `**File:** \`${filename}\`\n\n${review.review_comment}`
                );
                log.error(
                  `Failed to locate inline review comment: ${review.hunk_header || 'missing hunk header'}`
                );
                continue;
              }

              ress.push(inlineComment)
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
          body: createReviewBody(ress.length > 0, bodyComments),
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
