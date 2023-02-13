import { Context, Probot } from 'probot';
import { Chat } from './chat.js';

const OPENAI_API_KEY = 'OPENAI_API_KEY';

export const robot = (app: Probot) => {
  // const getDiff = async (context: Context, pullRequestNumber: number) => {
  //   const repo = context.repo();

  //   console.log(
  //     'start get diff for: ',
  //     JSON.stringify(repo),
  //     pullRequestNumber
  //   );

  //   const { data: diff } = await context.octokit.pulls.get({
  //     owner: repo.owner,
  //     repo: repo.repo,
  //     pull_number: pullRequestNumber,
  //     mediaType: {
  //       format: 'diff',
  //     },
  //   });

  //   console.log('get diff done for: ', JSON.stringify(repo));

  //   return diff as unknown as string;
  // };

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
};
