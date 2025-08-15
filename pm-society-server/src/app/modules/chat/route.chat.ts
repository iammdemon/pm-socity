
import express from "express"
import { askTPMSAI, askTPMSAiByGemini } from "./controller.chat";




const router = express.Router()



router.post("/", askTPMSAI);
router.post("/gemini", askTPMSAiByGemini)

export const chatRoutes = router