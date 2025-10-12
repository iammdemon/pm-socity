import catchAsync from "../../utils/catchAsync";
import { ForumService } from "./service.discussions";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: JwtPayload;
}

const createTopic = catchAsync(async (req: AuthRequest, res: Response) => {
  console.log(req.body);
  const result = await ForumService.createTopic(req.body, req.user!.email);
  res.status(201).json({message:"Topic created successfully", data: result});
});

const getAllTopics = catchAsync(async (req, res) => {
  const result = await ForumService.getAllTopics();
  res.status(200).json({message:"Topics Fetched successfully",data: result});
});

const getTopicById = catchAsync(async (req, res) => {
  const {topicId} = req.params;
  const result = await ForumService.getTopicById(topicId);
  res.status(200).json({message:"Topic Fetched successfully",data: result});
});

const addReply = catchAsync(async (req: AuthRequest, res: Response) => {
  const {topicId} = req.params;
  const result = await ForumService.addReplyToTopic(topicId, req.body, req.user!.email);
  res.status(201).json({message:"Reply added successfully",data: result});
});

const toggleReactionOnTopic = catchAsync(async (req: AuthRequest, res: Response) => {
  const {topicId} = req.params;
  const result = await ForumService.toggleReactionOnTopic(topicId, req.user!.email);
  res.status(200).json({message:"Reaction toggled successfully",data: result});
});

const toggleReactionOnReply = catchAsync(async (req: AuthRequest, res: Response) => {
  const {topicId, replyId} = req.params;
  const result = await ForumService.toggleReactionOnReply(topicId, replyId, req.user!.email);
  res.status(200).json({message:"Reaction toggled successfully",data: result});
});

export const ForumController = {
  createTopic,
  getAllTopics,
  getTopicById,
  addReply,
  toggleReactionOnTopic,
  toggleReactionOnReply
};
