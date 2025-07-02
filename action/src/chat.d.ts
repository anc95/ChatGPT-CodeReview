export declare class Chat {
    private groq;
    private model;
    constructor(apikey: string);
    private generatePrompt;
    codeReview: (patch: string) => Promise<{
        lgtm: boolean;
        review_comment: string;
    }>;
}
