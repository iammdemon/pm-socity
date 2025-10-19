import { Types } from "mongoose";
import { Goal } from "./model.goal";
import { User } from "../users/model.users";
import { IGoal } from "./interface.goal";

const createGoal = async (userEmail: string, goalData: Partial<IGoal>) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("User not found");

  const goal = new Goal({
    ...goalData,
    user: user._id,
  });

  return await goal.save();
};

const getUserGoals = async (userId: string | Types.ObjectId) => {
  return await Goal.find({ user: userId }).sort({ createdAt: -1 });
};

const updateGoal = async (goalId: string, data: Partial<IGoal>) => {
  return await Goal.findByIdAndUpdate(goalId, data, { new: true });
};

const deleteGoal = async (goalId: string) => {
  return await Goal.findByIdAndDelete(goalId);
};

export const goalService = {
  createGoal,
  getUserGoals,
  updateGoal,
  deleteGoal,
};
