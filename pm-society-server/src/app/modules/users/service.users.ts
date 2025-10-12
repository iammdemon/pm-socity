import IUser from "./interface.users";
import { User } from "./model.users";

const createUserIntoDB = async (payload: IUser) => {
  return await User.create(payload);
};

const getAllUsers = async () => {

  const result = await User.find()
  return result
};

const findByEmail = async (email: string) => {
  return await User.findOne({ email });
};

const getUserProfile = async (userId: string) => {
  return await User.findById(userId);
}

const updateUser = async (email: string, payload: Partial<IUser>) => {
const user = await User.findOne({ email });
if (!user) throw new Error("User not found");


  const updatedUser = await User.findOneAndUpdate(
    { email },
    { $set: payload },
    { new: true }
  );

  
  return updatedUser;
};

// Link another user
const linkUser = async (userId: string, targetUserId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  if (!user.linkedUsers) user.linkedUsers = [];
  if (!user.linkedUsers.includes(targetUserId)) {
    user.linkedUsers.push(targetUserId);
    await user.save();
  }
  return user;
};

// Unlink another user
const unlinkUser = async (userId: string, targetUserId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  if (user.linkedUsers) {
    user.linkedUsers = user.linkedUsers.filter(id => id !== targetUserId);
    await user.save();
  }
  return user;
};




export const userService = {
  createUserIntoDB,
  getAllUsers,
  findByEmail,
  updateUser,
  linkUser,
  unlinkUser,
  getUserProfile
};
