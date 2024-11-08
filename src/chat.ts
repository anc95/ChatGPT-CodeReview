import OpenAI from 'openai';
export class Chat {
  private openai: OpenAI;
  private isAzure: boolean;
  private apiVersion?: string;
  private deployment?: string;

  constructor(apikey: string) {
    this.isAzure = Boolean(process.env.AZURE_API_VERSION && process.env.AZURE_DEPLOYMENT);
    this.apiVersion = process.env.AZURE_API_VERSION || '';
    this.deployment = process.env.AZURE_DEPLOYMENT || '';
    
    const baseURL = this.isAzure
      ? `${process.env.OPENAI_API_ENDPOINT}/openai/deployments/${this.deployment}/chat/completions?api-version=${this.apiVersion}`
      : process.env.OPENAI_API_ENDPOINT || 'https://api.openai.com/v1';

    this.openai = new OpenAI({
      apiKey: apikey,
      baseURL,
    });
  }

  private generatePrompt = (patch: string) => {
    const answerLanguage = process.env.LANGUAGE
      ? `Answer me in ${process.env.LANGUAGE},`
      : '';

    const prompt =
      process.env.PROMPT ||
      'Below is a code patch, please help me do a brief code review on it. Any bug risks and/or improvement suggestions are welcome:';

    return `${prompt}, ${answerLanguage}:
    ${patch}
    `;
  };

  public codeReview = async (patch: string) => {
    if (!patch) {
      return '';
    }

    console.time('code-review cost');
    const prompt = this.generatePrompt(patch);

    const res = await this.openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        }
      ],
      // Use model or deployment name based on the environment
      model: this.isAzure ? this.deployment : process.env.MODEL || 'gpt-4',
      temperature: +(process.env.temperature || 0) || 1,
      top_p: +(process.env.top_p || 0) || 1,
      max_tokens: process.env.max_tokens
        ? +process.env.max_tokens
        : undefined,
    });

    console.timeEnd('code-review cost');

    if (res.choices.length) {
      return res.choices[0].message.content;
    }

    return "";
  };
}
