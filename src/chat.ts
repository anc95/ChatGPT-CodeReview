import { OpenAI, AzureOpenAI } from 'openai';

export class Chat {
  private openai: OpenAI | AzureOpenAI;
  private isAzure: boolean;
  private isGithubModels: boolean;

  constructor(apikey: string) {
    this.isAzure = Boolean(
        process.env.AZURE_API_VERSION && process.env.AZURE_DEPLOYMENT,
    );

    this.isGithubModels = process.env.USE_GITHUB_MODELS === 'true';

    if (this.isAzure) {
      // Azure OpenAI configuration
      this.openai = new AzureOpenAI({
        apiKey: apikey,
        endpoint: process.env.OPENAI_API_ENDPOINT || '',
        apiVersion: process.env.AZURE_API_VERSION || '',
        deployment: process.env.AZURE_DEPLOYMENT || '',
      });
    } else {
      // Standard OpenAI configuration
      this.openai = new OpenAI({
        apiKey: apikey,
        baseURL: this.isGithubModels ? 'https://models.github.ai/inference' : process.env.OPENAI_API_ENDPOINT || 'https://api.openai.com/v1',
      });
    }
  }

  private generatePrompt = (patch: string) => {
    const answerLanguage = process.env.LANGUAGE
        ? `Answer me in ${process.env.LANGUAGE},`
        : '';

    const userPrompt = process.env.PROMPT || 'Please review the following code patch. Focus on potential bugs, risks, and improvement suggestions.';
    
    const jsonFormatRequirement = '\nProvide your feedback in a strict JSON format with the following structure:\n' +
        '{\n' +
        '  "lgtm": boolean, // true if the code looks good to merge, false if there are concerns\n' +
        '  "review_comment": string // Your detailed review comments. You can use markdown syntax in this string, but the overall response must be a valid JSON\n' +
        '}\n' +
        'Ensure your response is a valid JSON object.\n';

    return `${userPrompt}${jsonFormatRequirement} ${answerLanguage}:
    ${patch}
    `;
  };

  public codeReview = async (patch: string): Promise<{ lgtm: boolean, review_comment: string }> => {
    if (!patch) {
      return {
        lgtm: true,
        review_comment: ""
      };
    }

    console.time('code-review cost');
    const prompt = this.generatePrompt(patch);

    const res = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: process.env.MODEL || (this.isGithubModels ? 'openai/gpt-4o-mini' : 'gpt-4o-mini'),
      temperature: +(process.env.temperature || 0) || 1,
      top_p: +(process.env.top_p || 0) || 1,
      max_tokens: process.env.max_tokens ? +process.env.max_tokens : undefined,
      response_format: {
        type: "json_object"
      },
    });

    console.timeEnd('code-review cost');

    if (res.choices.length) {
      try {
        const json = JSON.parse(res.choices[0].message.content || "");
        return json
      } catch (e) {
        return {
          lgtm: false,
          review_comment: res.choices[0].message.content || ""
        }
      }
    }

    return {
      lgtm: true,
      review_comment: ""
    }
  };
}
