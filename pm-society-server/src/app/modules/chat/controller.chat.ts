import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { getTPMSAIResponse } from "./service.chat";

export const askTPMSAI = catchAsync(async (req: Request, res: Response) => {
  const { question } = req.body;

  if (!question) {
    res.status(400).json({ error: "Question is required" });
    return; // ensure early return
  }

  const response = await getTPMSAIResponse({ question });
  res.json(response);
});

export const askTPMSAiByGemini = catchAsync(async (req, res) => {
 const { question } = req.body;

  if (!question) {
    res.status(400).json({ error: "Question is required" });
    return; // ensure early return
  }

  const response = await getTPMSAIResponse({ question });
  res.json(response);
})
