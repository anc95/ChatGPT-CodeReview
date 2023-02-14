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
    Bellow is the code patch, please help me do the code review\n
    
    ${patch}
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
