import { Types } from "mongoose";

export interface IGoal {
  user: Types.ObjectId;
  title: string; // Goal title
  description?: string; // Optional details about the goal
  startDate?: Date; // When the goal started
  endDate?: Date; // Optional expected or actual completion date
  status?: "in-progress" | "completed"; // Current status
}
