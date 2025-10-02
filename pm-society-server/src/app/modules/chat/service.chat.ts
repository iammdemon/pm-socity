import Groq from "groq-sdk";
import config from "../../config";
import { tpmsData, coachingData } from "./model.chat";
import { ChatRequest, ChatResponse } from "./interface.chat";
import { GoogleGenAI } from "@google/genai";

// Initialize AI clients
const ai = new GoogleGenAI({});
const groq = new Groq({ apiKey: config.GROQ_API_KEY });

/**
 * Get response from Groq (GPT OSS model)
 */
export async function getTPMSAIResponse(input: ChatRequest): Promise<ChatResponse> {
  const prompt = `
You are SIA – Your Society Intelligent Assistant, the official virtual agent for TPMS PMP Coaching.

Data about TPMS programs:
${JSON.stringify(tpmsData, null, 2)}

Behavior rules:
- Answer questions specifically about PMP, project management, product management, or TPMS offerings using the provided data.
- If the question is about general project/product management, provide a useful tip or guidance.
- If the question is unrelated (sports, politics, crypto, weather, etc.), reply politely:
"Sorry, I'm SIA – Your Society Intelligent Assistant. I only help with project and product management."

Always answer clearly, professionally, and provide actionable advice if possible.

User question: ${input.question}
`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [{ role: "system", content: prompt }],
  });

  return {
    answer: completion.choices[0].message.content || "No response generated.",
  };
}

/**
 * Get response from Google Gemini model
 */
export async function getTPMSAIResponseByGemini(req: ChatRequest): Promise<ChatResponse> {
  const prompt = `
You are SIA – Your Society Intelligent Assistant, a friendly and professional assistant for TPMS PMP Coaching.

Use this context to answer user questions:
${coachingData}

Question: ${req.question}

Answer professionally, providing helpful guidance for PMP or project management questions. 
If unrelated, politely say you only assist with project/product management.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const answer = response.text?.trim() ?? "Sorry, I cannot answer that.";

  return { answer };
}
