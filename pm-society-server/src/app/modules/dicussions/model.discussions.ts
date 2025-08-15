import mongoose, { Schema, Document } from "mongoose";
import { IForumTopic, IForumMessage } from "./interface.discussions";

interface ForumTopicDoc extends IForumTopic, Document {}
interface ForumMessageDoc extends IForumMessage, Document {}

const ForumTopicSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
  },
  { timestamps: true }
);

const ForumMessageSchema: Schema = new Schema(
  {
    topicId: { type: Schema.Types.ObjectId, ref: "ForumTopic", required: true },
    userName: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const ForumTopic = mongoose.model<ForumTopicDoc>("ForumTopic", ForumTopicSchema);
export const ForumMessage = mongoose.model<ForumMessageDoc>("ForumMessage", ForumMessageSchema);
