import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import { EventService } from "./service.events";

const createAEvent = catchAsync(async (req, res)=>{
 
    try {
        const result = await EventService.createAEventIntoDB(req.body);
        res.status(201).json({
            message: "Event created successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error creating Event:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

const getAllEvents = async (req: Request, res: Response) => {

    try {
        const result = await EventService.getAllEvents();
        res.status(200).json({
            message: "Events fetched successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error fetching Events:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
const getSingleEvent = catchAsync(async (req, res)=>{
    try {
        const slug = req.params.slug;
        const result = await EventService.getSingleEvent(slug);
        if (!result) {
            res.status(404).json({ error: "Event not found" });
            return;
        }
        res.status(200).json({
            message: "Event fetched successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error fetching Event:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

const updateEvent = catchAsync(async (req, res)=>{
    try {
        const slug = req.params.slug;
        const updatedData = req.body;
        const result = await EventService.updateEvent(slug, updatedData);
        if (!result) {
            res.status(404).json({ error: "Event not found" });
            return;
        }
        res.status(200).json({
            message: "Event updated successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error updating Event:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

const deleteEvent = catchAsync(async (req, res) => {
    try {
        const slug = req.params.slug;
        const result = await EventService.deleteEvent(slug);
        if (!result) {
            res.status(404).json({ error: "Event not found" });
            return;
        }
        res.status(200).json({
            message: "Event deleted successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error deleting Event:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

export const EventController = {
    createAEvent,
    getAllEvents,
    getSingleEvent,
    updateEvent,
    deleteEvent
};