import { OllamaClient } from "@/services/ollama/models";
import { IAInputAPIInterface } from "@/services/ollama/types";

export async function POST(req: Request) {

    if (req.body) {
        let data = await req.json() as IAInputAPIInterface;
        const iaClient = new OllamaClient();
        if (data.model !== undefined) {
            iaClient.iaModel = data.model;
        }
        const response = await iaClient.ragAnswer(data.prompt);

        return new Response(JSON.stringify({response:response}), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
}