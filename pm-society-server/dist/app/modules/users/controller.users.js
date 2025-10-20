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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const service_users_1 = require("./service.users");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const model_users_1 = require("./model.users");
const utils_user_1 = require("./utils.user");
const mongoose_1 = require("mongoose");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = "admin";
    if (!req.body.email) {
        res.status(400).json({ message: "Email is required" });
        return;
    }
    const userName = yield (0, utils_user_1.generateUsernameFromEmail)(req.body.email);
    const result = yield service_users_1.userService.createUserIntoDB(Object.assign(Object.assign({}, req.body), { role,
        userName }));
    res.status(201).json({ message: "User created successfully", data: result });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield service_users_1.userService.getAllUsers();
    res
        .status(200)
        .json({ message: "Users retrieved successfully", data: users });
}));
const updateUserProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const email = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email;
    if (!email)
        res.status(401).json({ message: "Unauthorized" });
    try {
        const updatedUser = yield service_users_1.userService.updateUser(email, req.body);
        res.status(200).json({
            message: "Profile updated successfully",
            data: updatedUser,
        });
    }
    catch (error) {
        // Handle specific errors
        if (error.message === "Username already taken") {
            res.status(409).json({ message: "Username already taken" });
        }
        if (error.message === "User not found") {
            res.status(404).json({ message: "User not found" });
        }
        // Generic error
        res.status(500).json({ message: "Failed to update profile" });
    }
}));
const generateLink = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Find all users without a username
    const usersWithoutUsername = yield model_users_1.User.find({
        username: { $exists: false },
    });
    for (const user of usersWithoutUsername) {
        const username = yield (0, utils_user_1.generateUsernameFromEmail)(user.email); // use your helper
        user.userName = username;
        yield user.save();
    }
    res.status(200).json({
        status: "success",
        message: `${usersWithoutUsername.length} users updated with usernames`,
    });
}));
const getUserByUserName = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req.params;
    const user = yield service_users_1.userService.getUserByUserName(userName);
    res.status(200).json({ status: "success", data: user });
}));
const toggleLink = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id: linkedUserId } = req.params;
    const userEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    if (!userEmail)
        res.status(401).json({ message: "Unauthorized" });
    const updatedUser = yield service_users_1.userService.toggleLink(new mongoose_1.Types.ObjectId(linkedUserId), userEmail);
    res
        .status(200)
        .json({ message: "Link toggled successfully", data: updatedUser });
}));
const resetPasswords = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Resetting passwords...");
    yield (0, utils_user_1.resetAllPasswords)();
    res.status(200).json({ message: "Passwords reset successfully" });
}));
exports.userController = {
    createUser,
    getAllUsers,
    updateUserProfile,
    toggleLink,
    generateLink,
    getUserByUserName,
    resetPasswords,
};
