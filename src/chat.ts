import { ChatGPTAPI } from "chatgpt"

const chatAPI = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY as string
})

export class Chat {
  private generatePrompt = (title: string, patch: string, extra?: string) => {
    return `
    The Pull Request title is ${title}, please do a code review for bellow code diff,
    and suggest a more approriate pull request title, $${extra ? 'biside, ' + extra + '.': ''} please be brief, Thanks.
    \n
    ${patch}
    \n\n
    
    As a code reviewer, your task is:
    - Review the code changes (diffs) in the patch and provide feedback.
    - If there are any bugs, highlight them.
    - If the Pull request title is not good, please provide a better one.

    Thank you in advance for your JOB
    `
  }

  public codeReview = async (title: string, patch: string, extra?: string) => {
    if (!patch) {
      return '';
    }

    const res = await chatAPI.sendMessage(this.generatePrompt(title, patch, extra))

    return res.text
  }
}