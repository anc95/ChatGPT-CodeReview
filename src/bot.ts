import { Context, Probot } from 'probot';
import { Chat } from './chat.js';

const OPENAI_API_KEY = 'OPENAI_API_KEY';

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

  app.on('push', async (context) => {
    const repo = context.repo();
    const chat = await loadChat(context);

    if (!chat) {
      return 'chat initial failed';
    }

    const diff = await context.octokit.request(
      'GET /repos/{owner}/{repo}/compare/{basehead}',
      {
        owner: repo.owner,
        repo: repo.repo,
        basehead: `${context.payload.before}...${context.payload.after}`,
      }
    );

    const patch = diff?.data?.files?.reduce?.(
      (p: string, { patch, filename }: any) => {
        return `${p}\n\n${filename}\n${patch}`;
      },
      ''
    );

    if (!patch) {
      return 'no data';
    }

    const result = await chat?.codeReview(patch);

    if (!!result) {
      await context.octokit.request(
        'POST /repos/{owner}/{repo}/commits/{commit_sha}/comments',
        {
          owner: repo.owner,
          repo: repo.repo,
          commit_sha: context.payload.sha,
          body: result,
        }
      );
      return 'success';
    }

    return 'no result returned';
  });
};
