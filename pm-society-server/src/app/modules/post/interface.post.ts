import { Types } from "mongoose";

export interface IPost {
    author : Types.ObjectId
    content: string
    commentCount : Number
    reactionCount: Number
    createdAt: Date
    updatedAt: Date

}