import { OllamaClient } from "@/services/ollama/models";
import { IAInputAPIInterface } from "@/services/ollama/types";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    return NextResponse.json({ msg: 'hello world' }, { status: 200 })
}

export async function POST(req: Request) {

    if (req.body) {
        let data = await req.json() as IAInputAPIInterface;
        const iaClient = new OllamaClient();
        const response = await iaClient.generateAnswer(data.prompt);

        return new Response(JSON.stringify(response), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
}