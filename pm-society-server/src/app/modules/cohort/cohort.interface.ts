import { Types } from "mongoose";

export interface ICohort {
    name: string
    description: string
    members: Types.ObjectId[]
}