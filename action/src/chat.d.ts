export declare class Chat {
    private chatAPI;
    constructor(apikey: string);
    private generatePrompt;
    codeReview: (patch: string) => Promise<string>;
}
