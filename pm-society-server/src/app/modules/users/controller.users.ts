import { Request, Response } from "express";
import { userService } from "./service.users";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const role= 'admin'
  const result = await userService.createUserIntoDB({...req.body, role});
  res.status(201).json({ message: "User created successfully", data: result });
  return
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.status(200).json({ message: "Users retrieved successfully", data: users });
});

export const userController = {
  createUser,
  getAllUsers,
};
