import { Context, Probot } from "probot";
import { Chat } from "./chat.js";

export const robot = (app: Probot) => {
  const chat = new Chat()
  const getDiff = async (context: Context, pullRequestNumber: number) => {
    const repo = context.repo()

    const { data: diff } = await context.octokit.pulls.get({
      owner: repo.owner,
      repo: repo.repo,
      pull_number: pullRequestNumber,
      mediaType: {
        format: 'diff'
      }
    });

    return diff as unknown as string
  }

  app.on("pull_request.opened", async context => {
    const issueComment = context.issue({
      body: await chat.codeReview(context.payload.pull_request.title, await getDiff(context, context.payload.pull_request.number)),
    });

    await context.octokit.issues.createComment(issueComment);
  })

  app.on("issue_comment.created", async context => {
    if (!context.payload.comment.body.startsWith('@CR')) {
      return
    }

    if (!context.payload.comment.html_url.includes('/pull/')) {
      return
    }

    const extraContent = context.payload.comment.body.substring(3)
    const diff = await getDiff(context, context.payload.issue.number)
    const issueComment = context.issue({
      body: await chat.codeReview(context.payload.issue.title, diff, extraContent),
    });

    await context.octokit.issues.createComment(issueComment);
  })
};