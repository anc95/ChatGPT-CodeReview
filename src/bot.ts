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

    const data = await context.octokit.request(
      `GET /repos/{owner}/{repo}/compare/{basehead}`,
      {
        owner: repo.owner,
        repo: repo.repo,
        basehead: `${context.payload.pull_request.base.sha}...${context.payload.pull_request.head.sha}`,
      }
    );

    const { files, commits } = data.data;

    if (!files?.length) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
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
