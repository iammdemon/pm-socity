"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const resourceSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    tags: { type: [String], default: [] },
}, { timestamps: true });
exports.Resource = mongoose_1.default.model('Resource', resourceSchema);
