import { model, Schema } from "mongoose";
import { ICounter, IForumTopic, IReply } from "./interface.discussions";

const CounterSchema = new Schema<ICounter>({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

const ReplySchema = new Schema<IReply>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    reactions: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

ReplySchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const ForumTopicSchema = new Schema<IForumTopic>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    topicId: { type: Number, unique: true },
    content: { type: String, required: true, trim: true },
    reactions: [{ type: Schema.Types.ObjectId, ref: "User" }],
    replies: [ReplySchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Auto-increment topicId
ForumTopicSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: "forumTopic" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.topicId = counter.seq;
  }
  next();
});

ForumTopicSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

ForumTopicSchema.virtual("replyCount").get(function () {
  return this.replies.length;
});

ForumTopicSchema.index({ createdAt: -1 });

export const ForumTopic = model<IForumTopic>("ForumTopic", ForumTopicSchema);
export const Reply = model<IReply>("Reply", ReplySchema);
export const Counter = model<ICounter>("Counter", CounterSchema);
