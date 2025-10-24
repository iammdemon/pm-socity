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
exports.Counter = exports.Reply = exports.ForumTopic = void 0;
const mongoose_1 = require("mongoose");
const CounterSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    seq: { type: Number, default: 0 },
});
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
const ForumTopicSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    topicId: { type: Number, unique: true },
    content: { type: String, required: true, trim: true },
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
// Auto-increment topicId
ForumTopicSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew) {
            const counter = yield exports.Counter.findOneAndUpdate({ name: "forumTopic" }, { $inc: { seq: 1 } }, { new: true, upsert: true });
            this.topicId = counter.seq;
        }
        next();
    });
});
ForumTopicSchema.virtual("reactionCount").get(function () {
    var _a;
    return ((_a = this.reactions) === null || _a === void 0 ? void 0 : _a.length) || 0;
});
ForumTopicSchema.virtual("replyCount").get(function () {
    var _a;
    return ((_a = this.replies) === null || _a === void 0 ? void 0 : _a.length) || 0;
});
ForumTopicSchema.index({ createdAt: -1 });
exports.ForumTopic = (0, mongoose_1.model)("ForumTopic", ForumTopicSchema);
exports.Reply = (0, mongoose_1.model)("Reply", ReplySchema);
exports.Counter = (0, mongoose_1.model)("Counter", CounterSchema);
