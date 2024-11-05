import OpenAI from 'openai';
export class Chat {
  private openai: OpenAI;

  constructor(apikey: string) {
    this.openai = new OpenAI({
      apiKey: apikey,
      baseURL: process.env.OPENAI_API_ENDPOINT || 'https://api.openai.com/v1',
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
      model: process.env.MODEL || 'gpt-4o-mini',
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

    return ""
  };
}
