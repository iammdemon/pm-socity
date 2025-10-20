import { Request, Response } from "express";
import { userService } from "./service.users";
import catchAsync from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { User } from "./model.users";
import { generateUsernameFromEmail, resetAllPasswords } from "./utils.user";
import { Types } from "mongoose";


interface AuthRequest extends Request {
  user?: JwtPayload;
}

const createUser = catchAsync(async (req: Request, res: Response) => {
  const role = "admin";
  await generateUsernameFromEmail(req.body.email);
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
  const email = req?.user?.email;
  if (!email)  res.status(401).json({ message: "Unauthorized" });

  try {
    const updatedUser = await userService.updateUser(email, req.body);
    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    // Handle specific errors
    if (error.message === "Username already taken") {
       res.status(409).json({ message: "Username already taken" });
    }
    if (error.message === "User not found") {
       res.status(404).json({ message: "User not found" });
    }
    
    // Generic error
    res.status(500).json({ message: "Failed to update profile" });
  }
});



const generateLink = catchAsync(async (req: Request, res: Response) => {
  // Find all users without a username
  const usersWithoutUsername = await User.find({ username: { $exists: false } });

  for (const user of usersWithoutUsername) {
    const username = await generateUsernameFromEmail(user.email); // use your helper
    user.userName = username;
    await user.save();
  }

  res.status(200).json({
    status: "success",
    message: `${usersWithoutUsername.length} users updated with usernames`,
  });
});

const getUserByUserName = catchAsync(async (req: AuthRequest, res: Response) => {
  const { userName } = req.params;
  const user = await userService.getUserByUserName(userName);
  res.status(200).json({ status: "success", data: user });
});

const toggleLink = catchAsync(async (req: AuthRequest, res: Response) => {
  const { id: linkedUserId } = req.params;
  const userEmail = req.user?.email;
  if (!userEmail)  res.status(401).json({ message: "Unauthorized" });

  const updatedUser = await userService.toggleLink(new Types.ObjectId(linkedUserId), userEmail);
  res.status(200).json({ message: "Link toggled successfully", data: updatedUser });
});

const resetPasswords= catchAsync(async (req, res) => {

  console.log("Resetting passwords...");
  await resetAllPasswords();
  res.status(200).json({ message: "Passwords reset successfully" });
});


export const userController = {
  createUser,
  getAllUsers,
  updateUserProfile,
  toggleLink,
  generateLink,
  getUserByUserName,
  resetPasswords
};
