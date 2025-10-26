import { model, Schema } from "mongoose";
import { IAchievement } from "./interface.achievement";

const AchievementSchema: Schema<IAchievement> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
    type: {
      type: String,
      enum: ["PMP", "CAPM", "ACP"],
    },
  },
  {
    timestamps: true,
  }
);

export const Achievement = model<IAchievement>(
  "Achievement",
  AchievementSchema
);
