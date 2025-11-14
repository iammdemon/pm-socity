"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CohortPostService = void 0;
// service.cohortPost.ts
const mongoose_1 = require("mongoose");
const model_cohortPost_1 = require("./model.cohortPost");
const model_users_1 = require("../users/model.users");
// Assuming you have a Cohort model
const minioClient_1 = require("../../utils/minioClient");
const model_cohort_1 = require("../cohort/model.cohort");
const createPost = (payload, userEmail, file) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user
    const user = yield model_users_1.User.findOne({ email: userEmail });
    if (!user)
        throw new Error("User not found");
    if (!mongoose_1.Types.ObjectId.isValid(payload.cohort)) {
        throw new Error("Invalid cohort ID");
    }
    // Verify user is a member of the cohort
    const cohort = yield model_cohort_1.Cohort.findById(payload.cohort);
    if (!cohort)
        throw new Error("Cohort not found");
    if (!cohort.members.includes(user._id) && user.role !== "admin") {
        throw new Error("Access denied: You are not a member of this cohort");
    }
    // Create post payload
    const postPayload = Object.assign(Object.assign({}, payload), { author: user._id });
    // Handle image upload
    if (file) {
        const { fileUrl } = yield minioClient_1.StorageService.uploadFile("cohort-post-images", file);
        postPayload.imageUrl = fileUrl;
    }
    return yield model_cohortPost_1.CohortPost.create(postPayload);
});
const getPostsByCohort = (cohortId_1, userEmail_1, ...args_1) => __awaiter(void 0, [cohortId_1, userEmail_1, ...args_1], void 0, function* (cohortId, userEmail, page = 1, limit = 20) {
    // Find user
    const user = yield model_users_1.User.findOne({ email: userEmail });
    if (!user)
        throw new Error("User not found");
    if (!mongoose_1.Types.ObjectId.isValid(cohortId)) {
        throw new Error("Invalid cohort ID format");
    }
    // Verify user is a member of the cohort or is admin
    const cohort = yield model_cohort_1.Cohort.findById(cohortId);
    if (!cohort)
        throw new Error("Cohort not found");
    if (!cohort.members.includes(user._id) && user.role !== "admin") {
        throw new Error("Access denied: You are not a member of this cohort");
    }
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    return yield model_cohortPost_1.CohortPost.find({ cohort: cohortId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("author", "name userName avatar")
        .populate("reactions", "name userName avatar")
        .populate("replies.author", "name userName avatar");
});
const getAllPostsForUser = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user
    const user = yield model_users_1.User.findOne({ email: userEmail });
    if (!user)
        throw new Error("User not found");
    // If user is admin, return all posts
    if (user.role === "admin") {
        return yield model_cohortPost_1.CohortPost.find()
            .sort({ createdAt: -1 })
            .populate("author", "name userName avatar")
            .populate("cohort", "name")
            .populate("reactions", "name userName avatar")
            .populate("replies.author", "name userName avatar");
    }
    // For regular users, return posts from cohorts they are members of
    const userCohorts = yield model_cohort_1.Cohort.find({ members: user._id });
    const cohortIds = userCohorts.map((cohort) => cohort._id);
    return yield model_cohortPost_1.CohortPost.find({ cohort: { $in: cohortIds } })
        .sort({ createdAt: -1 })
        .populate("author", "name userName avatar")
        .populate("cohort", "name")
        .populate("reactions", "name userName avatar")
        .populate("replies.author", "name userName avatar");
});
const getPostById = (postId, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user
    const user = yield model_users_1.User.findOne({ email: userEmail });
    if (!user)
        throw new Error("User not found");
    // Find post
    const post = yield model_cohortPost_1.CohortPost.findById(postId)
        .populate("author", "name userName avatar")
        .populate("cohort", "name")
        .populate("reactions.author", "name userName avatar")
        .populate("replies.author", "name userName avatar");
    if (!post)
        throw new Error("Post not found");
    // Check if user is a member of the cohort or is admin
    if (user.role !== "admin") {
        const cohort = yield model_cohort_1.Cohort.findById(post.cohort);
        if (!cohort || !cohort.members.includes(user._id)) {
            throw new Error("Access denied: You are not a member of this cohort");
        }
    }
    return post;
});
const addReplyToPost = (postId, reply, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user
    const user = yield model_users_1.User.findOne({ email: userEmail });
    if (!user)
        throw new Error("User not found");
    // Find post
    const post = yield model_cohortPost_1.CohortPost.findById(postId);
    if (!post)
        throw new Error("Post not found");
    // Check if user is a member of the cohort or is admin
    if (user.role !== "admin") {
        const cohort = yield model_cohort_1.Cohort.findById(post.cohort);
        if (!cohort || !cohort.members.includes(user._id)) {
            throw new Error("Access denied: You are not a member of this cohort");
        }
    }
    // Set author to user's ID
    reply.author = user._id;
    return yield model_cohortPost_1.CohortPost.findByIdAndUpdate(postId, { $push: { replies: reply } }, { new: true })
        .populate("author", "name userName avatar")
        .populate("replies.author", "name userName avatar");
});
const toggleReactionOnPost = (postId, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user
    const user = yield model_users_1.User.findOne({ email: userEmail });
    if (!user)
        throw new Error("User not found");
    // Find post
    const post = yield model_cohortPost_1.CohortPost.findById(postId);
    if (!post)
        throw new Error("Post not found");
    // Check if user is a member of the cohort or is admin
    if (user.role !== "admin") {
        const cohort = yield model_cohort_1.Cohort.findById(post.cohort);
        if (!cohort || !cohort.members.includes(user._id)) {
            throw new Error("Access denied: You are not a member of this cohort");
        }
    }
    if (post.reactions.includes(user._id)) {
        post.reactions = post.reactions.filter((id) => !id.equals(user._id));
    }
    else {
        post.reactions.push(user._id);
    }
    return yield post.save();
});
const toggleReactionOnReply = (postId, replyId, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user
    const user = yield model_users_1.User.findOne({ email: userEmail });
    if (!user)
        throw new Error("User not found");
    // Find post
    const post = yield model_cohortPost_1.CohortPost.findById(postId);
    if (!post)
        throw new Error("Post not found");
    // Check if user is a member of the cohort or is admin
    if (user.role !== "admin") {
        const cohort = yield model_cohort_1.Cohort.findById(post.cohort);
        if (!cohort || !cohort.members.includes(user._id)) {
            throw new Error("Access denied: You are not a member of this cohort");
        }
    }
    const reply = post.replies.find((reply) => reply._id.equals(replyId));
    if (!reply)
        throw new Error("Reply not found");
    if (reply.reactions.includes(user._id)) {
        reply.reactions = reply.reactions.filter((id) => !id.equals(user._id));
    }
    else {
        reply.reactions.push(user._id);
    }
    return yield post.save();
});
const editPost = (postId, updateData, userEmail, file) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user
    const user = yield model_users_1.User.findOne({ email: userEmail });
    if (!user)
        throw new Error("User not found");
    // Find post
    const post = yield model_cohortPost_1.CohortPost.findById(postId);
    if (!post)
        throw new Error("Post not found");
    // Check ownership (only author can edit) or admin
    if (!post.author.equals(user._id) && user.role !== "admin") {
        throw new Error("Unauthorized: You can only edit your own post");
    }
    // Handle optional new image upload
    if (file) {
        // If post already has an image, delete it from MinIO
        if (post.imageUrl) {
            try {
                yield minioClient_1.StorageService.deleteFile("cohort-post-images", post.imageUrl);
            }
            catch (err) {
                console.warn("Failed to delete old image:", err);
            }
        }
        // Upload new image
        const { fileUrl } = yield minioClient_1.StorageService.uploadFile("cohort-post-images", file);
        updateData.imageUrl = fileUrl;
    }
    // Update editable fields only (avoid overwriting system data)
    const editableFields = ["content", "imageUrl"];
    for (const key of Object.keys(updateData)) {
        if (editableFields.includes(key)) {
            post[key] = updateData[key];
        }
    }
    // Save updated post
    const updatedPost = yield post.save();
    // Populate author info before returning
    return yield updatedPost.populate("author", "name userName avatar");
});
const deletePost = (postId, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user
    const user = yield model_users_1.User.findOne({ email: userEmail });
    if (!user)
        throw new Error("User not found");
    // Find post
    const post = yield model_cohortPost_1.CohortPost.findById(postId);
    if (!post)
        throw new Error("Post not found");
    // Check ownership (only author can delete) or admin
    if (!post.author.equals(user._id) && user.role !== "admin") {
        throw new Error("Unauthorized: You can only delete your own post");
    }
    // Delete associated image if exists
    if (post.imageUrl) {
        try {
            yield minioClient_1.StorageService.deleteFile("cohort-post-images", post.imageUrl);
        }
        catch (err) {
            console.warn("Failed to delete post image:", err);
        }
    }
    // Delete the post itself
    yield model_cohortPost_1.CohortPost.deleteOne({ _id: postId });
    return { message: "Post deleted successfully" };
});
exports.CohortPostService = {
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
