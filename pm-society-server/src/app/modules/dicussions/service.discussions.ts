import { Types } from "mongoose";
import { IForumTopic, IReply } from "./interface.discussions";
import { ForumTopic } from "./model.discussions";
import { User } from "../users/model.users";
import { StorageService } from "../../utils/minioClient";


const createTopic = async (payload: IForumTopic, userEmail: string, file?: Express.Multer.File) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("User not found");

  payload.author = user._id;

  if (file) {
    const { fileUrl } = await StorageService.uploadFile("forum-topic-images", file);
    payload.imageUrl = fileUrl;
  }

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

const editTopic = async (
  topicId: string,
  updateData: Partial<IForumTopic>,
  userEmail: string,
  file?: Express.Multer.File
) => {
  // 1️⃣ Find the user
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("User not found");

  // 2️⃣ Find the topic
  const topic = await ForumTopic.findOne({ topicId });
  if (!topic) throw new Error("Topic not found");

  // 3️⃣ Check ownership (only author can edit)
  if (!topic.author.equals(user._id)) {
    throw new Error("Unauthorized: You can only edit your own topic");
  }

  // 4️⃣ Handle optional new image upload
  if (file) {
    // If topic already has an image, delete it from MinIO
    if (topic.imageUrl) {
      try {
        await StorageService.deleteFile("forum-topic-images",topic.imageUrl);
      } catch (err) {
        console.warn("Failed to delete old image:", err);
      }
    }

    // Upload new image
    const { fileUrl } = await StorageService.uploadFile("forum-topic-images", file);
    updateData.imageUrl = fileUrl;
  }

  // 5️⃣ Update editable fields only (avoid overwriting system data)
  const editableFields = ["title", "content", "imageUrl"];
  for (const key of Object.keys(updateData)) {
    if (editableFields.includes(key)) {
      (topic as any)[key] = (updateData as any)[key];
    }
  }

  // 6️⃣ Save updated topic
  const updatedTopic = await topic.save();

  // 7️⃣ Populate author info before returning
  return await updatedTopic.populate("author", "name userName avatar");
};

const deleteTopic = async (topicId: string, userEmail: string) => {
  // 1️⃣ Find user
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("User not found");

  // 2️⃣ Find topic
  const topic = await ForumTopic.findOne({ topicId });
  if (!topic) throw new Error("Topic not found");

  // 3️⃣ Ownership check
  if (!topic.author.equals(user._id)) {
    throw new Error("Unauthorized: You can only delete your own topic");
  }

  // 4️⃣ Delete associated image if exists
  if (topic.imageUrl) {
    try {
      await StorageService.deleteFile("forum-topic-images", topic.imageUrl);
    } catch (err) {
      console.warn("Failed to delete topic image:", err);
    }
  }

  // 5️⃣ Delete the topic itself
  await ForumTopic.deleteOne({ topicId });

  return { message: "Topic deleted successfully" };
};


export const ForumService = {
  createTopic,
  getAllTopics,
  editTopic,
  deleteTopic,
  getTopicById,
  addReplyToTopic,
  toggleReactionOnTopic,
  toggleReactionOnReply,
};
