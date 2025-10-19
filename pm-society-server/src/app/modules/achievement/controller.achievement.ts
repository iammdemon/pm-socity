import { Request, Response } from "express";
import { achievementService } from "./service.achievement";
import catchAsync from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: JwtPayload;
}

// Create Achievement
const createAchievement = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.user?.email)  res.status(401).json({ message: "Unauthorized" });

  const achievement = await achievementService.createAchievement(req.user!.email, req.body);
  res.status(201).json({ message: "Achievement created", data: achievement });
});

// Get Current User Achievements
const getMyAchievements = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.user?.email)  res.status(401).json({ message: "Unauthorized" });

  const achievements = await achievementService.getUserAchievements(req.user!.email);
  res.status(200).json({ message: "Achievements retrieved", data: achievements });
});

// Update Achievement
const updateAchievement = catchAsync(async (req: Request, res: Response) => {
  const updated = await achievementService.updateAchievement(req.params.id, req.body);
  res.status(200).json({ message: "Achievement updated", data: updated });
});

// Delete Achievement
const deleteAchievement = catchAsync(async (req: Request, res: Response) => {
  await achievementService.deleteAchievement(req.params.id);
  res.status(200).json({ message: "Achievement deleted" });
});

export const achievementController = {
  createAchievement,
  getMyAchievements,
  updateAchievement,
  deleteAchievement,
};
