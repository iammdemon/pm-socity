import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { EventService } from "./service.events";
import { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: JwtPayload;
}

const createAEvent = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await EventService.createAEventIntoDB(req.body, req.file);
  res.status(201).json({ message: "Event created successfully", data: result });
});

const getAllEvents = catchAsync(async (req: Request, res: Response) => {
  const result = await EventService.getAllEvents();
  res.status(200).json({ message: "Events fetched successfully", data: result });
});

const getSingleEvent = catchAsync(async (req: Request, res: Response) => {
  const result = await EventService.getSingleEvent(req.params.slug);
  if (!result)  res.status(404).json({ error: "Event not found" });
  res.status(200).json({ message: "Event fetched successfully", data: result });
});

const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const result = await EventService.updateEvent(req.params.slug, req.body, req.file);
  if (!result)  res.status(404).json({ error: "Event not found" });
  res.status(200).json({ message: "Event updated successfully", data: result });
});

const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const result = await EventService.deleteEvent(req.params.slug);
  res.status(200).json({ message: "Event deleted successfully", data: result });
});

const registeredIntoEvent = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await EventService.registeredIntoEvent(req.params.eventId, req.user?.email!);
  res.status(200).json({ message: "Event registered successfully", data: result });
});

export const EventController = {
  createAEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  registeredIntoEvent,
};
