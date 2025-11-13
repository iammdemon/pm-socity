// model.cohortPost.ts
import { model, Schema } from "mongoose";
import { ICounter, ICohortPost, IReply } from "./interface.cohortPost";
import { Counter } from "../dicussions/model.discussions";

// Use your existing reply schema
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
  return this.reactions?.length || 0;
});

const CohortPostSchema = new Schema<ICohortPost>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cohort: { type: Schema.Types.ObjectId, ref: "Cohort", required: true }, // Cohort reference
    content: { type: String, required: true, trim: true },
    imageUrl: { type: String },
    postId: { type: Number },
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

// Auto-increment postId - only needed if you want human-readable IDs
// If you don't need this, you can remove this pre-save hook
CohortPostSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: "cohortPost" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.postId = counter.seq;
  }
  next();
});

CohortPostSchema.virtual("reactionCount").get(function () {
  return this.reactions?.length || 0;
});

CohortPostSchema.virtual("replyCount").get(function () {
  return this.replies?.length || 0;
});

// Index for efficient queries
CohortPostSchema.index({ cohort: 1, createdAt: -1 });

export const CohortPost = model<ICohortPost>("CohortPost", CohortPostSchema);
