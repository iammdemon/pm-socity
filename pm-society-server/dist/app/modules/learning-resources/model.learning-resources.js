"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningResource = void 0;
const mongoose_1 = require("mongoose");
const LearningResourceSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    shortDescription: { type: String },
    linkUrl: { type: String, required: true },
}, {
    timestamps: true,
});
exports.LearningResource = (0, mongoose_1.model)("LearningResource", LearningResourceSchema);
