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
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const config_1 = __importDefault(require("./app/config"));
const groq = new groq_sdk_1.default({ apiKey: config_1.default.GROQ_API_KEY });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const completion = yield groq.chat.completions
            .create({
            messages: [
                {
                    role: "user",
                    content: "Explain about product management",
                },
            ],
            model: "llama-3.3-70b-versatile",
        });
        console.log(completion.choices[0].message.content);
    });
}
main();
