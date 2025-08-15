import mongoose, { Schema } from "mongoose";

export interface IBlog {
  title: string;
  slug: string;
  content: string;
  tags: string[];
  image: string;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    tags: { type: [String], required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);
