import { ChatGPTAPI } from 'chatgpt';
import core from '@actions/core';

export class Chat {
    private chatAPI: ChatGPTAPI;

    constructor(apikey: string) {
        this.chatAPI = new ChatGPTAPI({
            apiKey: apikey,
        });
    }

    private generatePrompt = (patch: string) => {
        return `Bellow is the code patch, please help me do a brief code review, if any bug risk and improvement suggestion are welcome
    ${patch}
    `;
    };

    public codeReview = async (patch: string) => {
        if (!patch) {
            return '';
        }

        console.time('code-review cost');

        const prompt = this.generatePrompt(patch);
        const language = core.getInput('language', { required: false });
        const promptSuffix = language ? `\nlet's start with ${language}` : "\nlet's start";

        const res = await this.chatAPI.sendMessage(prompt, {
            promptPrefix: 'hi,',
            promptSuffix,
        });

        console.timeEnd('code-review cost');
        return res.text;
    };
}
