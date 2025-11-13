// controller.cohortPost.ts
import catchAsync from "../../utils/catchAsync";
import { CohortPostService } from "./service.cohortPost";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

const createPost = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await CohortPostService.createPost(
    req.body,
    req.user!.email,
    req.file
  );
  res.status(201).json({ message: "Post created successfully", data: result });
});

const getPostsByCohort = catchAsync(async (req: AuthRequest, res: Response) => {
  const { cohortId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  
  const result = await CohortPostService.getPostsByCohort(
    cohortId,
    req.user!.email,
    page,
    limit
  );
  res.status(200).json({ message: "Posts fetched successfully", data: result });
});

const getAllPostsForUser = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await CohortPostService.getAllPostsForUser(req.user!.email);
  res.status(200).json({ message: "Posts fetched successfully", data: result });
});

const getPostById = catchAsync(async (req: AuthRequest, res: Response) => {
  const { postId } = req.params;
  const result = await CohortPostService.getPostById(postId, req.user!.email);
  res.status(200).json({ message: "Post fetched successfully", data: result });
});

const addReply = catchAsync(async (req: AuthRequest, res: Response) => {
  const { postId } = req.params;
  const result = await CohortPostService.addReplyToPost(
    postId,
    req.body,
    req.user!.email
  );
  res.status(201).json({ message: "Reply added successfully", data: result });
});

const toggleReactionOnPost = catchAsync(async (req: AuthRequest, res: Response) => {
  const { postId } = req.params;
  const result = await CohortPostService.toggleReactionOnPost(
    postId,
    req.user!.email
  );
  res.status(200).json({ message: "Reaction toggled successfully", data: result });
});

const toggleReactionOnReply = catchAsync(async (req: AuthRequest, res: Response) => {
  const { postId, replyId } = req.params;
  const result = await CohortPostService.toggleReactionOnReply(
    postId,
    replyId,
    req.user!.email
  );
  res.status(200).json({ message: "Reaction toggled successfully", data: result });
});

const editPost = catchAsync(async (req: AuthRequest, res: Response) => {
  const { postId } = req.params;
  
  const updatedPost = await CohortPostService.editPost(
    postId,
    req.body,
    req.user!.email,
    req.file // optional file (new image)
  );

  res.status(200).json({
    message: "Post updated successfully",
    data: updatedPost,
  });
});

const deletePost = catchAsync(async (req: AuthRequest, res: Response) => {
  const { postId } = req.params;

  const result = await CohortPostService.deletePost(postId, req.user!.email);

  res.status(200).json({
    message: result.message,
  });
});

export const CohortPostController = {
  createPost,
  getPostsByCohort,
  getAllPostsForUser,
  getPostById,
  editPost,
  deletePost,
  addReply,
  toggleReactionOnPost,
  toggleReactionOnReply,
};