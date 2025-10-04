"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTPMSAIResponse = getTPMSAIResponse;
exports.getTPMSAIResponseByGemini = getTPMSAIResponseByGemini;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const config_1 = __importDefault(require("../../config"));
const model_chat_1 = require("./model.chat");
const genai_1 = require("@google/genai");
// Initialize AI clients
const ai = new genai_1.GoogleGenAI({});
const groq = new groq_sdk_1.default({ apiKey: config_1.default.GROQ_API_KEY });
/**
 * Get response from Groq (GPT OSS model)
 */
function getTPMSAIResponse(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const prompt = `
You are SIA – Your Society Intelligent Assistant, the official virtual agent for TPMS PMP Coaching.

Data about TPMS programs:
${JSON.stringify(model_chat_1.tpmsData, null, 2)}

Behavior rules:
- Answer questions specifically about PMP, project management, product management, or TPMS offerings using the provided data.
- If the question is about general project/product management, provide a useful tip or guidance.
- If the question is unrelated (sports, politics, crypto, weather, etc.), reply politely:
"Sorry, I'm SIA – Your Society Intelligent Assistant. I only help with project and product management."

Always answer clearly, professionally, and provide actionable advice if possible.

User question: ${input.question}
`;
        const completion = yield groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [{ role: "system", content: prompt }],
        });
        return {
            answer: completion.choices[0].message.content || "No response generated.",
        };
    });
}
/**
 * Get response from Google Gemini model
 */
function getTPMSAIResponseByGemini(req) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const prompt = `
You are SIA – Your Society Intelligent Assistant, a friendly and professional assistant for TPMS PMP Coaching.

Use this context to answer user questions:
${model_chat_1.coachingData}

Question: ${req.question}

Answer professionally, providing helpful guidance for PMP or project management questions. 
If unrelated, politely say you only assist with project/product management.
`;
        const response = yield ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        const answer = (_b = (_a = response.text) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "Sorry, I cannot answer that.";
        return { answer };
    });
}
