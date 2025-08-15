"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_chat_1 = require("./controller.chat");
const router = express_1.default.Router();
router.post("/", controller_chat_1.askTPMSAI);
router.post("/gemini", controller_chat_1.askTPMSAiByGemini);
exports.chatRoutes = router;
