import { ChatGPTAPI } from 'chatgpt';
export class Chat {
  private chatAPI: ChatGPTAPI;

  constructor(apikey: string) {
    this.chatAPI = new ChatGPTAPI({
      apiKey: apikey,
    });
  }

  private generatePrompt = (patch: string) => {
    return `
    Act as a code reviewer of a commit, You are provided with bellow patch content
    ${patch}

    As a code reviewer, your task is:
    - Review the code changes (diffs) in the patch and provide feedback.
    - If there are any bugs, highlight them.
    - Do not highlight minor issues and nitpicks.
    - Use bullet points if you have multiple comments.
    
    Let's start code review
    `;
  };

  public codeReview = async (patch: string) => {
    if (!patch) {
      return '';
    }

    console.time('code-review cost');
    console.log('start query chatGPT');

    const res = await this.chatAPI.sendMessage(this.generatePrompt(patch));

    console.log('end query chatGPT');
    console.timeEnd('code-review cost');
    return res.text;
  };
}
