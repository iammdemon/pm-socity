import { Types } from "mongoose";

export interface IAchievement {
  user: Types.ObjectId;
  title: string; // Achievement title
  description?: string; // Optional details
  date?: Date; // When the achievement happened
  type?: "certification" | "award" | "milestone" | "recognition"; // Optional type
}
