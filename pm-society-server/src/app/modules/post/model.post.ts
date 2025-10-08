import { model, Schema } from "mongoose";
import { IPost } from "./interface.post";

const postSchema = new Schema<IPost>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    commentCount: { type: Number, default: 0 },
    reactionCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Post = model<IPost>("Post", postSchema);

