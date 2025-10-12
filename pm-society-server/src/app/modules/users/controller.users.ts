import { Request, Response } from "express";
import { userService } from "./service.users";
import catchAsync from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: JwtPayload;
}

const createUser = catchAsync(async (req: Request, res: Response) => {
  const role = "admin";
  const result = await userService.createUserIntoDB({ ...req.body, role });
  res.status(201).json({ message: "User created successfully", data: result });
  return;
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res
    .status(200)
    .json({ message: "Users retrieved successfully", data: users });
});

const updateUserProfile = catchAsync(async (req: AuthRequest, res: Response) => {

 const email = req?.user?.email
 console.log(email)

  if (!email) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const updatedUser = await userService.updateUser(email, req.body);
  res.status(200).json({
    message: "Profile updated successfully",
    data: updatedUser,
  });
});

const linkUserController = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { targetUserId } = req.body;
  const updatedUser = await userService.linkUser(userId, targetUserId);
  res
    .status(200)
    .json({ message: "User linked successfully", data: updatedUser });
});

const unlinkUserController = catchAsync(async (req: Request, res: Response) => {
  const userId = req.body.id;
  const { targetUserId } = req.body;
  const updatedUser = await userService.unlinkUser(userId, targetUserId);
  res
    .status(200)
    .json({ message: "User unlinked successfully", data: updatedUser });
});

export const userController = {
  createUser,
  getAllUsers,
  updateUserProfile,
  linkUserController,
  unlinkUserController,
};
