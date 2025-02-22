import { IAOutputAPIInterface, OllamaClientInterface, OllamaRequestPromptInterface } from "./types.js";

import fs from "node:fs/promises";

import { HuggingFaceEmbedding } from "@llamaindex/huggingface";
import { Ollama } from "@llamaindex/ollama";
import { Document, Settings, VectorStoreIndex } from "llamaindex";

export class OllamaClient implements OllamaClientInterface {
    baseUrl: string;
    iaModel:string;
    constructor() {
        this.baseUrl = "http://localhost:11434";
        this.iaModel = "llama3.2";

        Settings.llm = new Ollama({
            model: this.iaModel,
        });

        Settings.embedModel = new HuggingFaceEmbedding({
            modelType: "BAAI/bge-small-en-v1.5",
        });
          
          
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


    async ragAnswer(prompt:string) {
        const path = "refLog/extrait_log.log";

        const essay = await fs.readFile(path, "utf-8");

        // Create Document object with essay
        const document = new Document({ text: essay, id_: path });

        // Split text and create embeddings. Store them in a VectorStoreIndex
        const index = await VectorStoreIndex.fromDocuments([document]);

        // Query the index
        const queryEngine = index.asQueryEngine();

        const response = await queryEngine.query({
            query: prompt,
        });

        return response.toString();

    }
}