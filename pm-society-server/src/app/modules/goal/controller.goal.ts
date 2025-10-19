import { Request, Response } from "express";
import { goalService } from "./service.goal";
import catchAsync from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../users/model.users";

interface AuthRequest extends Request {
  user?: JwtPayload;
}

// Create Goal
const createGoal = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.user?.email) {
     res.status(401).json({ message: "Unauthorized" })
     return
  }

  const goal = await goalService.createGoal(req.user.email, req.body);
  res.status(201).json({ message: "Goal created", data: goal });
});

// Get Current User Goals
const getMyGoals = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.user?.email) {
     res.status(401).json({ message: "Unauthorized" });
     return
  }

  const user = await User.findOne({ email: req.user.email });
  if (!user) res.status(404).json({ message: "User not found" });

  const goals = await goalService.getUserGoals(user!._id);
  res.status(200).json({ message: "Goals retrieved", data: goals });
});

// Update Goal
const updateGoal = catchAsync(async (req: AuthRequest, res: Response) => {
  const updatedGoal = await goalService.updateGoal(req.params.id, req.body);
  res.status(200).json({ message: "Goal updated", data: updatedGoal });
});

// Delete Goal
const deleteGoal = catchAsync(async (req: AuthRequest, res: Response) => {
  await goalService.deleteGoal(req.params.id);
  res.status(200).json({ message: "Goal deleted" });
});

export const goalController = { createGoal, getMyGoals, updateGoal, deleteGoal };
