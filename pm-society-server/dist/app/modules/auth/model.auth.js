"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRefreshToken = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userRefreshTokenSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '10d'
    },
});
exports.UserRefreshToken = mongoose_1.default.model("UserRefreshToken", userRefreshTokenSchema);
