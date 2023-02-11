import { Probot, run } from "probot";
// import { ChatGPTAPI } from 'chatgpt'

const robot = (app: Probot) => {
  // const chatAPI = new ChatGPTAPI({
  //   apiKey: process.env.OPENAI_API_KEY as string
  // })

  app.on("pull_request.synchronize", async (context) => {
    // const issueComment = context.issue({
    //   body: "Thanks for opening this issue!",
    // });
    // await context.octokit.issues.createComment(issueComment);
    // const patchText = await context.octokit.request({url: context.payload.pull_request.patch_url})
    // const res = await chatAPI.sendMessage('Please review this patch:' + patchText);
    // console.log(await)
    // return patchText
    // return res

    // const { data } = await context.octokit.request({url: 'https://api.github.com/repos/anc95/test-chatgpt-codereview-bot/pulls/3/commits'})
    // context.octokit
    // const { base, head } = context.payload.pull_request
    // const repo = context.repo()

    // await context.octokit.request('GET /repos/{owner}/{repo}/compare/{basehead}', {
    //   owner: repo.owner,
    //   repo: repo.repo,
    //   basehead: `${base.sha}...${head.sha}`,
    // })
    // await context.octokit.request({
    //   url: '/repos/anc95/test-chatgpt-codereview-bot/compare/1b0abd7dff333fecfb2710ea558f1bca8c30da7c...938e178be64deb78c01a038554d6bdf737a476ce',
    //   method: 'GET'
    // })

    await context.octokit.issues.getComment()
  });
  app.on("pull_request.opened", async (context) => {
    // const issueComment = context.issue({
    //   body: "Thanks for opening this issue!",
    // });
    // await context.octokit.issues.createComment(issueComment);
    console.log(context)
  });
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};

run(robot)