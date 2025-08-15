import { IEvent } from "./interface.events"
import Event from "./model.events"



const createAEventIntoDB = async (payload: IEvent)=>{
    const result = await Event.create(payload)
    return result
}

const getAllEvents= async ()=>{
    const result = await Event.find()
    return result
}

const getSingleEvent = async (slug: string) => {
    const result = await Event.findOne({ slug });
    return result;
};
const updateEvent = async (slug: string, updateData: Partial<IEvent>) => {
    const result = await Event.findOneAndUpdate({ slug }, updateData, { new: true });
    return result;
};

const deleteEvent = async (slug: string) => {
    const result = await Event.findOneAndDelete({ slug });
    return result;
};
export const EventService = {
    createAEventIntoDB,
    getAllEvents,
    getSingleEvent,
    updateEvent,deleteEvent
}