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
exports.CohortPost = void 0;
// model.cohortPost.ts
const mongoose_1 = require("mongoose");
const model_discussions_1 = require("../dicussions/model.discussions");
// Use your existing reply schema
const ReplySchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    reactions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
ReplySchema.virtual("reactionCount").get(function () {
    var _a;
    return ((_a = this.reactions) === null || _a === void 0 ? void 0 : _a.length) || 0;
});
const CohortPostSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    cohort: { type: mongoose_1.Schema.Types.ObjectId, ref: "Cohort", required: true }, // Cohort reference
    content: { type: String, required: true, trim: true },
    imageUrl: { type: String },
    postId: { type: Number },
    reactions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    replies: [ReplySchema],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
// Auto-increment postId - only needed if you want human-readable IDs
// If you don't need this, you can remove this pre-save hook
CohortPostSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew) {
            const counter = yield model_discussions_1.Counter.findOneAndUpdate({ name: "cohortPost" }, { $inc: { seq: 1 } }, { new: true, upsert: true });
            this.postId = counter.seq;
        }
        next();
    });
});
CohortPostSchema.virtual("reactionCount").get(function () {
    var _a;
    return ((_a = this.reactions) === null || _a === void 0 ? void 0 : _a.length) || 0;
});
CohortPostSchema.virtual("replyCount").get(function () {
    var _a;
    return ((_a = this.replies) === null || _a === void 0 ? void 0 : _a.length) || 0;
});
// Index for efficient queries
CohortPostSchema.index({ cohort: 1, createdAt: -1 });
exports.CohortPost = (0, mongoose_1.model)("CohortPost", CohortPostSchema);
