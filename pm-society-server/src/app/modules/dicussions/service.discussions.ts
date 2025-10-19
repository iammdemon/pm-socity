import { Types } from "mongoose";
import { IForumTopic, IReply } from "./interface.discussions";
import { ForumTopic } from "./model.discussions";
import { User } from "../users/model.users";


const createTopic = async (payload: IForumTopic, userEmail: string) => {
  // Find user by email
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("User not found");
  
  // Set author to user's ID
  payload.author = user._id;
  
  console.log(payload);
  return await ForumTopic.create(payload);
};

const getAllTopics = async () => {
  return await ForumTopic.find()
    .sort({ createdAt: -1 }) 
    .populate("author", "name userName avatar")
    .populate("reactions", "name userName avatar")
    .populate("replies.author", "name userName avatar ");
};


const getTopicById = async (topicId: string) => {
  return await ForumTopic.findOne({ topicId })
    .populate("author", "name userName avatar")
    .populate("reactions.author", "name userName avatar ")
    .populate("replies.author", "name userName avatar ");
};

const addReplyToTopic = async (topicId: string, reply: IReply, userEmail: string) => {
  // Find user by email
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("User not found");
  
  // Set author to user's ID
  reply.author = user._id;
  
  return await ForumTopic.findOneAndUpdate(
    { topicId },
    { $push: { replies: reply } },
    { new: true }
  ).populate("replies.author", "name userName avatar");
};

const toggleReactionOnTopic = async (
  topicId: string,
  userEmail: string
) => {
  // Find user by email
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("User not found");
  
  const topic = await ForumTopic.findOne({ topicId });
  if (!topic) throw new Error("Topic not found");

  if (topic.reactions.includes(user._id)) {
    topic.reactions = topic.reactions.filter((id) => !id.equals(user._id));
  } else {
    topic.reactions.push(user._id as Types.ObjectId);
  }
  return await topic.save();
};

const toggleReactionOnReply = async (
  topicId: string,
  replyId: string,
  userEmail: string
) => {
  // Find user by email
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("User not found");

  const topic = await ForumTopic.findOne({ topicId });
  if (!topic) throw new Error("Topic not found");

  const reply = topic.replies.find((reply) => reply._id.equals(replyId));
  if (!reply) throw new Error("Reply not found");

  if (reply.reactions.includes(user._id)) {
    reply.reactions = reply.reactions.filter((id) => !id.equals(user._id));
  } else {
    reply.reactions.push(user._id as Types.ObjectId);
  }

  return await topic.save();
};

export const ForumService = {
  createTopic,
  getAllTopics,
  getTopicById,
  addReplyToTopic,
  toggleReactionOnTopic,
  toggleReactionOnReply,
};
