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
const model_chat_2 = require("./model.chat");
const ai = new genai_1.GoogleGenAI({});
const groq = new groq_sdk_1.default({
    apiKey: config_1.default.GROQ_API_KEY,
});
function getTPMSAIResponse(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const prompt = `
You are TPMS AI, the virtual agent for TPMS PMP Coaching website.

Data about your program:
${JSON.stringify(model_chat_1.tpmsData, null, 2)}

Behavior rules:
- If question is about PMP, project management, product management, or your offerings, answer from data.
- If question is generally about project or product management (even if not in data), give a useful tip.
- If completely unrelated (sports, politics, weather, crypto etc), reply:
"Sorry, I'm TPMS AI. I only help with project and product management."

Answer clearly and professionally, and always relate back to project/product management.

User question: ${input.question}
`;
        const completion = yield groq.chat.completions.create({
            model: "llama3-70b-8192",
            messages: [
                { role: "system", content: prompt },
            ],
        });
        return {
            answer: completion.choices[0].message.content || "No response generated."
        };
    });
}
function getTPMSAIResponseByGemini(req) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const prompt = `
You are TPMS AI, a friendly assistant for PMP coaching.
Use this context to answer questions:

${model_chat_2.coachingData}

Question: ${req.question}

Answer:`;
        const response = yield ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        let answer = (_b = (_a = response.text) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "Sorry, I cannot answer that.";
        return { answer };
    });
}
