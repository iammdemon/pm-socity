// service.cohortPost.ts
import { Types } from "mongoose";
import { ICohortPost, IReply } from "./interface.cohortPost";
import { CohortPost } from "./model.cohortPost";
import { User } from "../users/model.users";
// Assuming you have a Cohort model
import { StorageService } from "../../utils/minioClient";
import { Cohort } from "../cohort/model.cohort";

const createPost = async (
  payload: Omit<ICohortPost, "_id" | "author" | "createdAt" | "updatedAt">,
  userEmail: string,
  file?: Express.Multer.File
) => {
  // Find user
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("User not found");

  // Verify user is a member of the cohort
  const cohort = await Cohort.findById(payload.cohort);
  if (!cohort) throw new Error("Cohort not found");
  
  if (!cohort.members.includes(user._id) && user.role !== "admin") {
    throw new Error("Access denied: You are not a member of this cohort");
  }

  // Create post payload
  const postPayload: any = {
    ...payload,
    author: user._id,
  };

  // Handle image upload
  if (file) {
    const { fileUrl } = await StorageService.uploadFile("cohort-post-images", file);
    postPayload.imageUrl = fileUrl;
  }

  return await CohortPost.create(postPayload);
};

const getPostsByCohort = async (
  cohortId: string,
  userEmail: string,
  page: number = 1,
  limit: number = 20
) => {
  // Find user
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("User not found");

  // Verify user is a member of the cohort or is admin
  const cohort = await Cohort.findById(cohortId);
  if (!cohort) throw new Error("Cohort not found");
  
  if (!cohort.members.includes(user._id) && user.role !== "admin") {
    throw new Error("Access denied: You are not a member of this cohort");
  }

  // Calculate skip value for pagination
  const skip = (page - 1) * limit;

  return await CohortPost.find({ cohort: cohortId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("author", "name userName avatar")
    .populate("reactions", "name userName avatar")
    .populate("replies.author", "name userName avatar");
};

const getAllPostsForUser = async (userEmail: string) => {
  // Find user
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("User not found");

  // If user is admin, return all posts
  if (user.role === "admin") {
    return await CohortPost.find()
      .sort({ createdAt: -1 })
      .populate("author", "name userName avatar")
      .populate("cohort", "name")
      .populate("reactions", "name userName avatar")
      .populate("replies.author", "name userName avatar");
  }

  // For regular users, return posts from cohorts they are members of
  const userCohorts = await Cohort.find({ members: user._id });
  const cohortIds = userCohorts.map(cohort => cohort._id);

  return await CohortPost.find({ cohort: { $in: cohortIds } })
    .sort({ createdAt: -1 })
    .populate("author", "name userName avatar")
    .populate("cohort", "name")
    .populate("reactions", "name userName avatar")
    .populate("replies.author", "name userName avatar");
};

const getPostById = async (postId: string, userEmail: string) => {
  // Find user
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("User not found");

  // Find post
  const post = await CohortPost.findById(postId)
    .populate("author", "name userName avatar")
    .populate("cohort", "name")
    .populate("reactions.author", "name userName avatar")
    .populate("replies.author", "name userName avatar");

  if (!post) throw new Error("Post not found");

  // Check if user is a member of the cohort or is admin
  if (user.role !== "admin") {
    const cohort = await Cohort.findById(post.cohort);
    if (!cohort || !cohort.members.includes(user._id)) {
      throw new Error("Access denied: You are not a member of this cohort");
    }
  }

  return post;
};

const addReplyToPost = async (
  postId: string,
  reply: IReply,
  userEmail: string
) => {
  // Find user
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("User not found");

  // Find post
  const post = await CohortPost.findById(postId);
  if (!post) throw new Error("Post not found");

  // Check if user is a member of the cohort or is admin
  if (user.role !== "admin") {
    const cohort = await Cohort.findById(post.cohort);
    if (!cohort || !cohort.members.includes(user._id)) {
      throw new Error("Access denied: You are not a member of this cohort");
    }
  }

  // Set author to user's ID
  reply.author = user._id;

  return await CohortPost.findByIdAndUpdate(
    postId,
    { $push: { replies: reply } },
    { new: true }
  )
    .populate("author", "name userName avatar")
    .populate("replies.author", "name userName avatar");
};

const toggleReactionOnPost = async (
  postId: string,
  userEmail: string
) => {
  // Find user
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("User not found");

  // Find post
  const post = await CohortPost.findById(postId);
  if (!post) throw new Error("Post not found");

  // Check if user is a member of the cohort or is admin
  if (user.role !== "admin") {
    const cohort = await Cohort.findById(post.cohort);
    if (!cohort || !cohort.members.includes(user._id)) {
      throw new Error("Access denied: You are not a member of this cohort");
    }
  }

  if (post.reactions.includes(user._id)) {
    post.reactions = post.reactions.filter((id) => !id.equals(user._id));
  } else {
    post.reactions.push(user._id as Types.ObjectId);
  }

  return await post.save();
};

const toggleReactionOnReply = async (
  postId: string,
  replyId: string,
  userEmail: string
) => {
  // Find user
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("User not found");

  // Find post
  const post = await CohortPost.findById(postId);
  if (!post) throw new Error("Post not found");

  // Check if user is a member of the cohort or is admin
  if (user.role !== "admin") {
    const cohort = await Cohort.findById(post.cohort);
    if (!cohort || !cohort.members.includes(user._id)) {
      throw new Error("Access denied: You are not a member of this cohort");
    }
  }

  const reply = post.replies.find((reply) => reply._id.equals(replyId));
  if (!reply) throw new Error("Reply not found");

  if (reply.reactions.includes(user._id)) {
    reply.reactions = reply.reactions.filter((id) => !id.equals(user._id));
  } else {
    reply.reactions.push(user._id as Types.ObjectId);
  }

  return await post.save();
};

const editPost = async (
  postId: string,
  updateData: Partial<ICohortPost>,
  userEmail: string,
  file?: Express.Multer.File
) => {
  // Find user
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("User not found");

  // Find post
  const post = await CohortPost.findById(postId);
  if (!post) throw new Error("Post not found");

  // Check ownership (only author can edit) or admin
  if (!post.author.equals(user._id) && user.role !== "admin") {
    throw new Error("Unauthorized: You can only edit your own post");
  }

  // Handle optional new image upload
  if (file) {
    // If post already has an image, delete it from MinIO
    if (post.imageUrl) {
      try {
        await StorageService.deleteFile("cohort-post-images", post.imageUrl);
      } catch (err) {
        console.warn("Failed to delete old image:", err);
      }
    }

    // Upload new image
    const { fileUrl } = await StorageService.uploadFile("cohort-post-images", file);
    updateData.imageUrl = fileUrl;
  }

  // Update editable fields only (avoid overwriting system data)
  const editableFields = ["content", "imageUrl"];
  for (const key of Object.keys(updateData)) {
    if (editableFields.includes(key)) {
      (post as any)[key] = (updateData as any)[key];
    }
  }

  // Save updated post
  const updatedPost = await post.save();

  // Populate author info before returning
  return await updatedPost.populate("author", "name userName avatar");
};

const deletePost = async (postId: string, userEmail: string) => {
  // Find user
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("User not found");

  // Find post
  const post = await CohortPost.findById(postId);
  if (!post) throw new Error("Post not found");

  // Check ownership (only author can delete) or admin
  if (!post.author.equals(user._id) && user.role !== "admin") {
    throw new Error("Unauthorized: You can only delete your own post");
  }

  // Delete associated image if exists
  if (post.imageUrl) {
    try {
      await StorageService.deleteFile("cohort-post-images", post.imageUrl);
    } catch (err) {
      console.warn("Failed to delete post image:", err);
    }
  }

  // Delete the post itself
  await CohortPost.deleteOne({ _id: postId });

  return { message: "Post deleted successfully" };
};

export const CohortPostService = {
  createPost,
  getPostsByCohort,
  getAllPostsForUser,
  getPostById,
  editPost,
  deletePost,
  addReplyToPost,
  toggleReactionOnPost,
  toggleReactionOnReply,
};