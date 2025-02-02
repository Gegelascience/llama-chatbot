import { IAOutputAPIInterface, OllamaClientInterface, OllamaRequestPromptInterface } from "./types.js";

export class OllamaClient implements OllamaClientInterface {
    baseUrl: string;
    iaModel:string;
    constructor() {
        this.baseUrl = "http://localhost:11434";
        this.iaModel = "llama3.2";
    }
    async generateAnswer(prompt:string) {

        const promptData: OllamaRequestPromptInterface = {
            prompt,
            model: this.iaModel,
            stream: false
        } 

        try {
            console.log("url: " + `${this.baseUrl}/api/generate`)
            const response = await fetch(`${this.baseUrl}/api/generate/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(promptData),
                
            });
            if (response.ok) {
                return await response.json() as IAOutputAPIInterface;
                
            } else {
                console.error(response.status);
                console.error(await response.text());
                return { response: "Error" };
            }
        } catch (error) {
            console.error(error);
            return { response: "Error" };
        }
    }
}