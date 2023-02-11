import { Probot, run } from "probot";
import './env.js'
import { Chat } from "./chat.js";
// import { ChatGPTAPI } from 'chatgpt'

const robot = (app: Probot) => {
  const chat = new Chat()

  app.on("pull_request.synchronize", async (context) => {
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
  });
};

run(robot)