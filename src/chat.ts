import { ChatGPTAPI } from "chatgpt"

const chatAPI = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY as string
})

export class Chat {
  private generatePrompt = (title: string, patch: string, extra?: string) => {
    return `
    Please do a brief code review for following diff

    ${extra ? '-' + extra: ''}
    \n
    ${patch}
    \n\n
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