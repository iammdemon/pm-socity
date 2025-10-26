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
exports.userService = void 0;
const model_discussions_1 = require("../dicussions/model.discussions");
const model_users_1 = require("./model.users");
const model_goal_1 = require("../goal/model.goal");
const model_achievement_1 = require("../achievement/model.achievement");
const minioClient_1 = require("../../utils/minioClient");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_users_1.User.create(payload);
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_users_1.User.find();
    return result;
});
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_users_1.User.findOne({ email });
});
const updateUser = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_users_1.User.findOne({ email });
    if (!user)
        throw new Error("User not found");
    // Check username uniqueness
    if (payload.userName && payload.userName !== user.userName) {
        const exists = yield model_users_1.User.findOne({
            userName: payload.userName,
            _id: { $ne: user._id }
        });
        if (exists)
            throw new Error("Username already taken");
    }
    return yield model_users_1.User.findOneAndUpdate({ email }, { $set: payload }, { new: true });
});
const getUserByUserName = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the user by username
    const user = yield model_users_1.User.findOne({ userName }).select("-password").populate("linkedUsers", "name userName avatar");
    if (!user) {
        throw new Error("User not found");
    }
    // Find all posts authored by this user
    const posts = yield model_discussions_1.ForumTopic.find({ author: user._id })
        .sort({ createdAt: -1 }) // newest first
        .populate("reactions", "name userName avatar")
        .populate("replies.author", "name userName avatar");
    const goals = yield model_goal_1.Goal.find({ user: user._id }).sort({ createdAt: -1 });
    const achievements = yield model_achievement_1.Achievement.find({ user: user._id }).sort({ createdAt: -1 });
    return {
        profile: user,
        posts,
        goals,
        achievements
    };
});
const toggleLink = (linkedUserId, currentUserEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_users_1.User.findOne({ email: currentUserEmail });
    if (!user)
        throw new Error("User not found");
    const targetUser = yield model_users_1.User.findById(linkedUserId);
    if (!targetUser)
        throw new Error("Target user not found");
    if (!user.linkedUsers)
        user.linkedUsers = [];
    if (!targetUser.linkedUsers)
        targetUser.linkedUsers = [];
    const isAlreadyLinked = user.linkedUsers.some(id => id.toString() === linkedUserId.toString());
    if (isAlreadyLinked) {
        // 🔻 Remove link from both users
        user.linkedUsers = user.linkedUsers.filter(id => id.toString() !== linkedUserId.toString());
        targetUser.linkedUsers = targetUser.linkedUsers.filter(id => id.toString() !== user._id.toString());
    }
    else {
        // 🔗 Add link to both users
        user.linkedUsers.push(linkedUserId);
        targetUser.linkedUsers.push(user._id);
    }
    yield user.save();
    yield targetUser.save();
    return user;
});
const updateAvatar = (email, avatarFile) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_users_1.User.findOne({ email });
    if (!user)
        throw new Error("User not found");
    const bucket = "avatars";
    // Upload new file
    const { fileUrl } = yield minioClient_1.StorageService.uploadFile(bucket, avatarFile);
    // Delete old avatar if exists
    if (user.avatar) {
        yield minioClient_1.StorageService.deleteFile(bucket, user.avatar);
    }
    user.avatar = fileUrl;
    yield user.save();
    return user;
});
exports.userService = {
    createUserIntoDB,
    getAllUsers,
    findByEmail,
    updateUser,
    toggleLink,
    getUserByUserName,
    updateAvatar
};
