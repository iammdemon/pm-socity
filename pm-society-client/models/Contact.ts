import mongoose, { model, models, Schema } from "mongoose";
export interface IContact {
  name: string;
  email: string;
  _id: mongoose.Types.ObjectId;
  phone: string;
  message: string;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Contact = models.Contact || model<IContact>("Contact", contactSchema);
