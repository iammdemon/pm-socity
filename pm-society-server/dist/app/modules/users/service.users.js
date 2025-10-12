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
const model_users_1 = require("./model.users");
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
const getUserProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_users_1.User.findById(userId);
});
const updateUser = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_users_1.User.findOne({ email });
    if (!user)
        throw new Error("User not found");
    const updatedUser = yield model_users_1.User.findOneAndUpdate({ email }, { $set: payload }, { new: true });
    return updatedUser;
});
// Link another user
const linkUser = (userId, targetUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_users_1.User.findById(userId);
    if (!user)
        throw new Error("User not found");
    if (!user.linkedUsers)
        user.linkedUsers = [];
    if (!user.linkedUsers.includes(targetUserId)) {
        user.linkedUsers.push(targetUserId);
        yield user.save();
    }
    return user;
});
// Unlink another user
const unlinkUser = (userId, targetUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_users_1.User.findById(userId);
    if (!user)
        throw new Error("User not found");
    if (user.linkedUsers) {
        user.linkedUsers = user.linkedUsers.filter(id => id !== targetUserId);
        yield user.save();
    }
    return user;
});
exports.userService = {
    createUserIntoDB,
    getAllUsers,
    findByEmail,
    updateUser,
    linkUser,
    unlinkUser,
    getUserProfile
};
