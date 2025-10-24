import { Types } from "mongoose"

export interface IEvent{
    title: string
    slug: string
    description: string
    image: string
    date: string
    location: string
    joinedUser?: Types.ObjectId[]

}