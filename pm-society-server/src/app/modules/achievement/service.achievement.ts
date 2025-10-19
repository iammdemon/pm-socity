import { Achievement } from "./model.achievement";
import { User } from "../users/model.users";
import { IAchievement } from "./interface.achievement";

const createAchievement = async (email: string, data: Partial<IAchievement>) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const achievement = new Achievement({
    ...data,
    user: user._id, 
  });

  return await achievement.save();
};

const getUserAchievements = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  return await Achievement.find({ user: user._id }).sort({ date: -1 });
};

const updateAchievement = async (id: string, data: Partial<IAchievement>) => {
  return await Achievement.findByIdAndUpdate(id, data, { new: true });
};

const deleteAchievement = async (id: string) => {
  return await Achievement.findByIdAndDelete(id);
};

export const achievementService = {
  createAchievement,
  getUserAchievements,
  updateAchievement,
  deleteAchievement,
};
