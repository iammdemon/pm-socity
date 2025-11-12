import { model, Schema } from "mongoose";
import { ICohort } from "./cohort.interface";

const CohortSchema = new Schema<ICohort>(
  {
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);


CohortSchema.virtual("memberCount").get(function(){
    return this.members?.length || 0
})


export const Cohort = model<ICohort>("Cohort", CohortSchema)
