import { Probot } from "probot";
import { Chat } from "./chat.js";

export const robot = (app: Probot) => {
  const chat = new Chat()

  const handleReview = async (context: any) => {
    const repo = context.repo()

    const { data: diff } = await context.octokit.pulls.get({
      owner: repo.owner,
      repo: repo.repo,
      pull_number: context.payload.pull_request.number,
      mediaType: {
        format: 'diff'
      }
    });
    
    const issueComment = context.issue({
      body: await chat.codeReview(context.payload.pull_request.title, diff as unknown as string),
    });

    await context.octokit.issues.createComment(issueComment);
  }

  app.on("pull_request.synchronize", handleReview);

  app.on("pull_request.opened", handleReview)
};