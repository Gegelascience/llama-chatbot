export interface OllamaClientInterface {
    generateAnswer(prompt: string): Promise<IAOutputAPIInterface>;
    baseUrl: string;
    iaModel: string;
}

export interface OllamaRequestPromptInterface {
    prompt: string;
    model: string;
    stream: boolean;
}

export interface IAInputAPIInterface {
    prompt: string;
}

export interface IAOutputAPIInterface {
    response: string;
}