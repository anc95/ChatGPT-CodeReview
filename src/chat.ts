import { ChatGPTAPI } from 'chatgpt';

const chatAPI = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

export class Chat {
  private generatePrompt = (_: string, patch: string) => {
    return `
    Act as a code reviewer of a Pull Request, providing feedback on the code changes below.
    You are provided with a github pull request diff url.
    \n\n
    Diff url of the Pull Request to review:
    \n
    ${patch}
    \n\n
    
    As a code reviewer, your task is:
    - Review the code changes (diffs) in the patch and provide feedback.
    - If there are any bugs, highlight them.
    - Do not highlight minor issues and nitpicks.
    - Use bullet points if you have multiple comments.
    
    Let's start code review
    `;
  };

  public codeReview = async (title: string, patch: string) => {
    if (!patch) {
      return '';
    }

    console.time('code-review cost');
    console.log('start query chatGPT');

    const res = await chatAPI.sendMessage(this.generatePrompt(title, patch));

    console.log('end query chatGPT');
    console.timeEnd('code-review cost');
    return res.text;
  };
}
