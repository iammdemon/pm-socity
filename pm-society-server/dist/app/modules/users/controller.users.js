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
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = "admin";
    const result = yield service_users_1.userService.createUserIntoDB(Object.assign(Object.assign({}, req.body), { role }));
    res.status(201).json({ message: "User created successfully", data: result });
    return;
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
    console.log(email);
    if (!email) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const updatedUser = yield service_users_1.userService.updateUser(email, req.body);
    res.status(200).json({
        message: "Profile updated successfully",
        data: updatedUser,
    });
}));
const linkUserController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { targetUserId } = req.body;
    const updatedUser = yield service_users_1.userService.linkUser(userId, targetUserId);
    res
        .status(200)
        .json({ message: "User linked successfully", data: updatedUser });
}));
const unlinkUserController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.id;
    const { targetUserId } = req.body;
    const updatedUser = yield service_users_1.userService.unlinkUser(userId, targetUserId);
    res
        .status(200)
        .json({ message: "User unlinked successfully", data: updatedUser });
}));
exports.userController = {
    createUser,
    getAllUsers,
    updateUserProfile,
    linkUserController,
    unlinkUserController,
};
