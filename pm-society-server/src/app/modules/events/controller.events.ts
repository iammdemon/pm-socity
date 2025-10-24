import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import { EventService } from "./service.events";
import { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: JwtPayload;
}

const createAEvent = catchAsync(async (req, res) => {
  const result = await EventService.createAEventIntoDB(req.body);
  res.status(201).json({
    message: "Event created successfully",
    data: result,
  });
});

const getAllEvents = async (req: Request, res: Response) => {
  const result = await EventService.getAllEvents();
  res.status(200).json({
    message: "Events fetched successfully",
    data: result,
  });
};
const getSingleEvent = catchAsync(async (req, res) => {
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
});

const updateEvent = catchAsync(async (req, res) => {
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
});

const deleteEvent = catchAsync(async (req, res) => {
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
});

const registeredIntoEvent = catchAsync(async (req: AuthRequest, res) => {
  const email = req.user?.email;
  const eventId = req.params.eventId;

  const result = await EventService.registeredIntoEvent(eventId, email);

  res.status(200).json({
    success: true,
    message: "Event registered successfully",
    data: result,
  });
});

export const EventController = {
  createAEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  registeredIntoEvent,
};
