import { IEvent } from "./interface.events";
import Event from "./model.events";

import { User } from "../users/model.users";
import { StorageService } from "../../utils/minioClient";

const BUCKET = "events";

const createAEventIntoDB = async (payload: IEvent, file?: Express.Multer.File) => {
  let imageUrl: string | undefined;

  if (file) {
    const upload = await StorageService.uploadFile(BUCKET, file);
    imageUrl = upload.fileUrl;
  }

  const event = await Event.create({
    ...payload,
    image: imageUrl || payload.image, // fallback in case of manual URL
  });
  return event;
};

const getAllEvents = async () => {
  return Event.find().populate("joinedUser", "name email").sort({ createdAt: -1 });
};

const getSingleEvent = async (slug: string) => {
  return Event.findOne({ slug }).populate("joinedUser", "name email");
};

const updateEvent = async (slug: string, updateData: Partial<IEvent>, file?: Express.Multer.File) => {
  const event = await Event.findOne({ slug });
  if (!event) throw new Error("Event not found");

  if (file) {
    // upload new image
    const upload = await StorageService.uploadFile(BUCKET, file);
    updateData.image = upload.fileUrl;

    // delete old one
    if (event.image) {
      await StorageService.deleteFile(BUCKET, event.image);
    }
  }

  const updated = await Event.findOneAndUpdate({ slug }, updateData, { new: true });
  return updated;
};

const deleteEvent = async (slug: string) => {
  const event = await Event.findOne({ slug });
  if (!event) throw new Error("Event not found");

  if (event.image) {
    await StorageService.deleteFile(BUCKET, event.image);
  }

  await Event.findOneAndDelete({ slug });
  return event;
};

const registeredIntoEvent = async (eventId: string, email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const event = await Event.findById(eventId);
  if (!event) throw new Error("Event not found");

  const alreadyJoined = event.joinedUser?.some(
    (id) => id.toString() === user._id.toString()
  );

  if (alreadyJoined) throw new Error("User already registered for this event");

  event.joinedUser?.push(user._id);
  await event.save();

  return await Event.findById(eventId).populate("joinedUser", "name email");
};

export const EventService = {
  createAEventIntoDB,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  registeredIntoEvent,
};
