"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Achievement = void 0;
const mongoose_1 = require("mongoose");
const AchievementSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
    type: {
        type: String,
        enum: ["PMP", "CAPM", "ACP"],
    },
}, {
    timestamps: true,
});
exports.Achievement = (0, mongoose_1.model)("Achievement", AchievementSchema);
