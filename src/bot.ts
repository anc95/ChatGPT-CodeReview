import { Context, Probot } from 'probot';
import { Chat } from './chat.js';

const OPENAI_API_KEY = 'OPENAI_API_KEY';
const MAX_PATCH_COUNT = 4000;

export const robot = (app: Probot) => {
  const loadChat = async (context: Context) => {
    const repo = context.repo();
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
  };

  app.on(['pull_request.opened', 'pull_request.synchronize'], async (context) => {
    const repo = context.repo();
    const chat = await loadChat(context);
    const pull_request = context.payload.pull_request;

    if (pull_request.state === 'closed' || pull_request.locked || pull_request.draft) {
      return;
    }

    const data = await context.octokit.request(
      `GET /repos/{owner}/{repo}/compare/{basehead}`,
      {
        owner: repo.owner,
        repo: repo.repo,
        basehead: `${context.payload.pull_request.base.sha}...${context.payload.pull_request.head.sha}`,
      }
    );

    let { files: changedFiles, commits } = data.data;

    if (context.payload.action === 'synchronize') {
      if (commits.length >= 2) {
        const { data: { files } } = await context.octokit.request(
          `GET /repos/{owner}/{repo}/compare/{basehead}`,
          {
            owner: repo.owner,
            repo: repo.repo,
            basehead: `${commits[commits.length - 2].sha}...${commits[commits.length - 1].sha}`,
          }
        );

        const filesNames = files?.map(file => file.filename) || [];
        changedFiles = changedFiles?.filter(file => filesNames.includes(file.filename))
      }
    }


    if (!changedFiles?.length) {
      return;
    }

    for (let i = 0; i < changedFiles.length; i++) {
      const file = changedFiles[i];
      const patch = file.patch || '';

      if (!patch || patch.length > MAX_PATCH_COUNT) {
        continue;
      }
      const res = await chat?.codeReview(patch);

      if (!!res) {
        await context.octokit.pulls.createReviewComment({
          repo: repo.repo,
          owner: repo.owner,
          pull_number: context.pullRequest().pull_number,
          commit_id: commits[commits.length - 1].sha,
          path: file.filename,
          body: res,
          position: patch.split('\n').length - 1
        });
      }
    }
  });
};
