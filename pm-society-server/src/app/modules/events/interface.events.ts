import { Types } from "mongoose"

export interface IEvent{
    title: string
    slug: string
    description: string
    image: string
    date: Date
    location: string
    joinedUser?: Types.ObjectId[]

}