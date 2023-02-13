import { Context, Probot } from 'probot';
import { Chat } from './chat.js';

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
    const config = (await context.config('cr-gpt.yml')) as {
      OPENAI_API_KEY: string;
    };

    if (!config?.OPENAI_API_KEY) {
      return null;
    }

    return new Chat(config.OPENAI_API_KEY);
  };

  app.on('pull_request.opened', async (context) => {
    const chat = await loadChat(context);

    if (!chat) {
      return 'no chat initialized';
    }

    async function cr() {
      const issueComment = context.issue({
        body: await chat.codeReview(
          context.payload.pull_request.title,
          context.payload.pull_request.diff_url
        ),
      });

      await context.octokit.issues.createComment(issueComment);
    }

    try {
      await cr();
      return 'success';
    } catch (e) {
      console.error(e);
      return e;
    }
  });

  app.on('issue_comment.created', async (context) => {
    if (!context.payload.comment.body.startsWith('/cr.gpt')) {
      return;
    }

    if (!context.payload.comment.html_url.includes('/pull/')) {
      return;
    }

    const chat = await loadChat(context);

    if (!chat) {
      return 'no chat initialized';
    }

    async function cr() {
      // const diff = await getDiff(context, context.payload.issue.number);
      const issueComment = context.issue({
        body: await chat.codeReview(
          context.payload.issue.title,
          context.payload.issue.pull_request?.diff_url as string
        ),
      });

      await context.octokit.issues.createComment(issueComment);
    }

    try {
      await cr();
      return 'success';
    } catch (e) {
      console.error(e);
      return e;
    }
  });
};
