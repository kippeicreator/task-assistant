import "server-only";

import { GoogleGenAI } from "@google/genai";

const GEMINI_MODEL = "gemini-2.0-flash";

function getGeminiApiKey() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set");
    }

    return apiKey;
}

export async function generateGeminiText(prompt: string): Promise<string> {
    const ai = new GoogleGenAI({
        apiKey: getGeminiApiKey(),
    });

    const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
    });

    return response.text ?? "";
}
