export declare class Chat {
    private openai;
    private isAzure;
    constructor(apikey: string);
    private generatePrompt;
    codeReview: (patch: string) => Promise<{
        lgtm: boolean;
        review_comment: string;
    }>;
}
