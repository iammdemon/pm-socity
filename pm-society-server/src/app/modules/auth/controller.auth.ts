import { Request, Response } from "express";
import { authService } from "./service.auth";
import catchAsync from "../../utils/catchAsync";
import { User } from "../users/model.users";

interface AuthRequest extends Request {
  user?: { email: string; role: string };
}

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, userRole } = await authService.loginUser(req.body);

  // Instead of setting cookies, return the token in the response
  res.status(200).json({
    message: "Login successful",
    accessToken,
    userRole,
  });
});

const getMe = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }
  const user = await User.findOne({ email: req.user.email }).lean();
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  delete (user as any).password;

  res.status(200).json({ message: "User profile fetched", data: user });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  // Since we're using localStorage, the client will handle clearing the token
  res.status(200).json({ message: "Logged out successfully" });
});

const changePassword = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  await authService.changePassword(req.user, req.body);

  res.status(200).json({ message: "Password changed successfully" });
});

export const authController = {
  loginUser,
  getMe,
  logoutUser,
  changePassword,
};