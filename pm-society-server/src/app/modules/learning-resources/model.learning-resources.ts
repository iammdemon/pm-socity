import { model, Schema } from "mongoose";
import { ILearningResource } from "./interface.learning-resources";

const LearningResourceSchema = new Schema<ILearningResource>(
  {
    title: { type: String, required: true },
    shortDescription: { type: String },
    linkUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const LearningResource = model<ILearningResource>(
  "LearningResource",
  LearningResourceSchema
);

