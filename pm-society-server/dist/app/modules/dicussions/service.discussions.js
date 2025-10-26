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
exports.ForumService = void 0;
const model_discussions_1 = require("./model.discussions");
const model_users_1 = require("../users/model.users");
const minioClient_1 = require("../../utils/minioClient");
const createTopic = (payload, userEmail, file) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_users_1.User.findOne({ email: userEmail });
    if (!user)
        throw new Error("User not found");
    payload.author = user._id;
    if (file) {
        const { fileUrl } = yield minioClient_1.StorageService.uploadFile("forum-topic-images", file);
        payload.imageUrl = fileUrl;
    }
    return yield model_discussions_1.ForumTopic.create(payload);
});
const getAllTopics = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_discussions_1.ForumTopic.find()
        .sort({ createdAt: -1 })
        .populate("author", "name userName avatar")
        .populate("reactions", "name userName avatar")
        .populate("replies.author", "name userName avatar ");
});
const getTopicById = (topicId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_discussions_1.ForumTopic.findOne({ topicId })
        .populate("author", "name userName avatar")
        .populate("reactions.author", "name userName avatar ")
        .populate("replies.author", "name userName avatar ");
});
const addReplyToTopic = (topicId, reply, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user by email
    const user = yield model_users_1.User.findOne({ email: userEmail });
    if (!user)
        throw new Error("User not found");
    // Set author to user's ID
    reply.author = user._id;
    return yield model_discussions_1.ForumTopic.findOneAndUpdate({ topicId }, { $push: { replies: reply } }, { new: true }).populate("replies.author", "name userName avatar");
});
const toggleReactionOnTopic = (topicId, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user by email
    const user = yield model_users_1.User.findOne({ email: userEmail });
    if (!user)
        throw new Error("User not found");
    const topic = yield model_discussions_1.ForumTopic.findOne({ topicId });
    if (!topic)
        throw new Error("Topic not found");
    if (topic.reactions.includes(user._id)) {
        topic.reactions = topic.reactions.filter((id) => !id.equals(user._id));
    }
    else {
        topic.reactions.push(user._id);
    }
    return yield topic.save();
});
const toggleReactionOnReply = (topicId, replyId, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user by email
    const user = yield model_users_1.User.findOne({ email: userEmail });
    if (!user)
        throw new Error("User not found");
    const topic = yield model_discussions_1.ForumTopic.findOne({ topicId });
    if (!topic)
        throw new Error("Topic not found");
    const reply = topic.replies.find((reply) => reply._id.equals(replyId));
    if (!reply)
        throw new Error("Reply not found");
    if (reply.reactions.includes(user._id)) {
        reply.reactions = reply.reactions.filter((id) => !id.equals(user._id));
    }
    else {
        reply.reactions.push(user._id);
    }
    return yield topic.save();
});
exports.ForumService = {
    createTopic,
    getAllTopics,
    getTopicById,
    addReplyToTopic,
    toggleReactionOnTopic,
    toggleReactionOnReply,
};
