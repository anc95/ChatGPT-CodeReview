import { ChatGPTAPI } from 'chatgpt';

const chatAPI = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

export class Chat {
  private generatePrompt = (title: string, patch: string, extra?: string) => {
    return `
    The pull request title is ${title}, Please do a brief code review for following diff:

    ${extra ? '-' + extra : ''}
    \n
    ${patch}
    \n\n
    `;
  };

  public codeReview = async (title: string, patch: string, extra?: string) => {
    if (!patch) {
      return '';
    }

    console.time('code-review cost');
    console.log('start query chatGPT');

    const res = await chatAPI.sendMessage(
      this.generatePrompt(title, patch, extra)
    );

    console.log('end query chatGPT');
    console.timeEnd('code-review cost');
    return res.text;
  };
}
