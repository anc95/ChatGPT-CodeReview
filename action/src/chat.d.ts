export declare class Chat {
    private openai;
    private isAzure;
    private isGithubModels;
    constructor(apikey: string);
    private generatePrompt;
    codeReview: (patch: string) => Promise<{
        lgtm: boolean;
        review_comment: string;
    }>;
}
