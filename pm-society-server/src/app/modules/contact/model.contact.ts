import { model, Schema } from "mongoose";
import { IContact } from "./interface.contact";

const contactSchema = new Schema<IContact>({
  name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
},
{
    timestamps: true,
    
});

export const Contact = model<IContact>("Contact", contactSchema);