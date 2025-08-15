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
exports.authController = void 0;
const service_auth_1 = require("./service.auth");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const model_users_1 = require("../users/model.users");
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken, userRole } = yield service_auth_1.authService.loginUser(req.body);
    // Instead of setting cookies, return the token in the response
    res.status(200).json({
        message: "Login successful",
        accessToken,
        userRole,
    });
}));
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }
    const user = yield model_users_1.User.findOne({ email: req.user.email }).lean();
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    delete user.password;
    res.status(200).json({ message: "User profile fetched", data: user });
}));
const logoutUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Since we're using localStorage, the client will handle clearing the token
    res.status(200).json({ message: "Logged out successfully" });
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }
    yield service_auth_1.authService.changePassword(req.user, req.body);
    res.status(200).json({ message: "Password changed successfully" });
}));
exports.authController = {
    loginUser,
    getMe,
    logoutUser,
    changePassword,
};
