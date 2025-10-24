import { User } from "../users/model.users";
import { IEvent } from "./interface.events";
import Event from "./model.events";

const createAEventIntoDB = async (payload: IEvent) => {
  const result = await Event.create(payload);
  return result;
};

const getAllEvents = async () => {
  const result = await Event.find().populate("joinedUser", "name email");
  return result;
};

const getSingleEvent = async (slug: string) => {
  const result = await Event.findOne({ slug });
  return result;
};
const updateEvent = async (slug: string, updateData: Partial<IEvent>) => {
  const result = await Event.findOneAndUpdate({ slug }, updateData, {
    new: true,
  });
  return result;
};

const deleteEvent = async (slug: string) => {
  const result = await Event.findOneAndDelete({ slug });
  return result;
};

const registeredIntoEvent = async (eventId: string, email: string) => {
  // 1️⃣ Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  // 2️⃣ Check if event exists
  const event = await Event.findById(eventId);
  if (!event) {
    throw new Error("Event not found");
  }

  // 3️⃣ Prevent duplicate registration
  const alreadyJoined = event.joinedUser?.some(
    (id) => id.toString() === user._id.toString()
  );
  if (alreadyJoined) {
    throw new Error("User already registered for this event");
  }

  // 4️⃣ Add user to joinedUser array
  event.joinedUser?.push(user._id);
  await event.save();

  // 5️⃣ Populate user info if needed
  const updatedEvent = await Event.findById(eventId).populate(
    "joinedUser",
    "name email"
  );

  return updatedEvent;
};
export const EventService = {
  createAEventIntoDB,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  registeredIntoEvent,
};
