import { Types } from "mongoose";


export interface IReply{
  _id: Types.ObjectId
  author: Types.ObjectId
  content: string
  reactions: Types.ObjectId[]
  createdAt?: Date
  updatedAt?: Date
}

export interface IForumTopic {
  _id:Types.ObjectId
 author : Types.ObjectId
 topicId: number
 content: string
 reactions: Types.ObjectId[]
 replies: IReply[]
 createdAt?: Date
 updatedAt?: Date

}

export interface ICounter {
  name: string;
  seq: number;
}

