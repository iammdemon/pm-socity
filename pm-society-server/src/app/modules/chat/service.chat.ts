import Groq from "groq-sdk";

import config from "../../config";
import { tpmsData } from "./model.chat";
import { ChatRequest, ChatResponse } from "./interface.chat";
import { GoogleGenAI } from "@google/genai";

import { coachingData } from "./model.chat";

const ai = new GoogleGenAI({});

const groq = new Groq({
  apiKey: config.GROQ_API_KEY,
});

export async function getTPMSAIResponse(input: ChatRequest): Promise<ChatResponse> {
  const prompt = `
You are TPMS AI, the virtual agent for TPMS PMP Coaching website.

Data about your program:
${JSON.stringify(tpmsData, null, 2)}

Behavior rules:
- If question is about PMP, project management, product management, or your offerings, answer from data.
- If question is generally about project or product management (even if not in data), give a useful tip.
- If completely unrelated (sports, politics, weather, crypto etc), reply:
"Sorry, I'm TPMS AI. I only help with project and product management."

Answer clearly and professionally, and always relate back to project/product management.

User question: ${input.question}
`;

  const completion = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [
      { role: "system", content: prompt },
    ],
  });

  return {
    answer: completion.choices[0].message.content || "No response generated."
  };
}





export async function getTPMSAIResponseByGemini(req: ChatRequest): Promise<ChatResponse> {
  const prompt = `
You are TPMS AI, a friendly assistant for PMP coaching.
Use this context to answer questions:

${coachingData}

Question: ${req.question}

Answer:`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let answer = response.text?.trim() ?? "Sorry, I cannot answer that.";

  return { answer };
}
