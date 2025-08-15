import mongoose from "mongoose";
import { IEvent } from "./interface.events";

const eventSchema = new mongoose.Schema<IEvent>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
