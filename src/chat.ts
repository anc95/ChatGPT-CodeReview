import { ChatGPTAPI } from "chatgpt"

const chatAPI = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY as string
})

export class Chat {
  private generatePrompt = (title: string, patch: string) => {
    return `  Act as a code reviewer of a Pull Request, providing feedback on the code changes below.
    You are provided with the Pull Request changes in a patch format.
    Each patch entry has file name in the Subject line followed by the code changes (diffs) in a unidiff format.
    \n\n
    The Pull Request title is ${title}
    Patch of the Pull Request to review:
    \n
    ${patch}
    \n\n
    
    As a code reviewer, your task is:
    - Review the code changes (diffs) in the patch and provide feedback.
    - If there are any bugs, highlight them.
    - If the Pull request title is not good, please provide a better one.
    `
  }

  public codeReview = async (title: string, patch: string) => {
    if (!patch) {
      return '';
    }

    const res = await chatAPI.sendMessage(this.generatePrompt(title, patch))

    return res.text
  }
}