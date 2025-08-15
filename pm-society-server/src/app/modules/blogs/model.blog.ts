import mongoose from "mongoose";
import { IBlog } from "./interface.blog";


const blogSchema = new mongoose.Schema<IBlog>({
    title: {type: String, required: true},
    slug: {type: String, required: true},
    content: {type: String, required: true},
     tags: {type: [String], required: true},
     image: {type: String, required: true}
}, {
    timestamps: true
});

export const Blog = mongoose.model<IBlog>("Blog", blogSchema);