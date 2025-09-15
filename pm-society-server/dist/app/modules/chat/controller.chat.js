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
exports.askTPMSAiByGemini = exports.askTPMSAI = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const service_chat_1 = require("./service.chat");
exports.askTPMSAI = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { question } = req.body;
    if (!question) {
        res.status(400).json({ error: "Question is required" });
        return; // ensure early return
    }
    const response = yield (0, service_chat_1.getTPMSAIResponse)({ question });
    res.json(response);
}));
exports.askTPMSAiByGemini = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { question } = req.body;
    if (!question) {
        res.status(400).json({ error: "Question is required" });
        return; // ensure early return
    }
    const response = yield (0, service_chat_1.getTPMSAIResponse)({ question });
    res.json(response);
}));
