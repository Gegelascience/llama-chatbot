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
    model?: string;
}

export interface IAOutputAPIInterface {
    response: string;
}