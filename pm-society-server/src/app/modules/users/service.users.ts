import { Types } from "mongoose";
import { ForumTopic } from "../dicussions/model.discussions";
import IUser from "./interface.users";
import { User } from "./model.users";
import { Goal } from "../goal/model.goal";
import { Achievement } from "../achievement/model.achievement";

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



const updateUser = async (email: string, payload: Partial<IUser>) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  // Check username uniqueness
  if (payload.userName && payload.userName !== user.userName) {
    const exists = await User.findOne({ 
      userName: payload.userName, 
      _id: { $ne: user._id }
    });
    if (exists) throw new Error("Username already taken");
  }

  return await User.findOneAndUpdate(
    { email },
    { $set: payload },
    { new: true }
  );
};


const getUserByUserName = async (userName: string) => {
  // Find the user by username
  const user = await User.findOne({ userName }).select(
    "-password" 
  ).populate("linkedUsers", "name userName avatar");


  if (!user) {
    throw new Error("User not found");
  }

  // Find all posts authored by this user
  const posts = await ForumTopic.find({ author: user._id })
    .sort({ createdAt: -1 }) // newest first
    .populate("reactions", "name userName avatar")
    .populate("replies.author", "name userName avatar");

  const goals = await Goal.find({ user: user._id }).sort({ createdAt: -1 });
  const achievements = await Achievement.find({ user: user._id }).sort({ createdAt: -1 });

  return {
    profile: user,
    posts,
    goals,
    achievements
  };
};




const toggleLink = async (linkedUserId: Types.ObjectId, currentUserEmail: string) => {
  const user = await User.findOne({ email: currentUserEmail });
  if (!user) throw new Error("User not found");
  console.log(user)

  const targetUser = await User.findById(linkedUserId);
  if (!targetUser) throw new Error("Target user not found");
  console.log(targetUser)


  if (!user.linkedUsers) user.linkedUsers = [];
  if (!targetUser.linkedUsers) targetUser.linkedUsers = [];

  const isAlreadyLinked = user.linkedUsers.some(id => id.toString() === linkedUserId.toString());

  console.log(isAlreadyLinked)

  if (isAlreadyLinked) {
    // 🔻 Remove link from both users
    user.linkedUsers = user.linkedUsers.filter(id => id.toString() !== linkedUserId.toString());
    targetUser.linkedUsers = targetUser.linkedUsers.filter(id => id.toString() !== user._id.toString());
  } else {
    // 🔗 Add link to both users
    user.linkedUsers.push(linkedUserId);
    targetUser.linkedUsers.push(user._id);
  }

  await user.save();
  await targetUser.save();

  return user;
};








export const userService = {
  createUserIntoDB,
  getAllUsers,
  findByEmail,
  updateUser,
 toggleLink,
  getUserByUserName
};
