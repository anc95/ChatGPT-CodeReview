export declare class Chat {
    private openai;
    private isAzure;
    private apiVersion?;
    private deployment?;
    constructor(apikey: string);
    private generatePrompt;
    codeReview: (patch: string) => Promise<string | null>;
}
