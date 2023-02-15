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

  app.on('pull_request.opened', async (context) => {
    const repo = context.repo();
    const chat = await loadChat(context);

    const pl = context.payload.pull_request;
  });
};
