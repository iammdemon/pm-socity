// interface.cohortPost.ts
import { Types } from "mongoose";

// Use your existing reply interface
export interface IReply {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  content: string;
  reactions: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICohortPost {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  cohort: Types.ObjectId; // Reference to cohort
  content: string;
  imageUrl?: string;
  postId: number;
  reactions: Types.ObjectId[];
  replies: IReply[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Counter is used for auto-incrementing IDs if you want human-readable IDs
// This is optional - you can use MongoDB's default _id instead
export interface ICounter {
  name: string;
  seq: number;
}