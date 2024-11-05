export declare class Chat {
    private openai;
    constructor(apikey: string);
    private generatePrompt;
    codeReview: (patch: string) => Promise<string | null>;
}
