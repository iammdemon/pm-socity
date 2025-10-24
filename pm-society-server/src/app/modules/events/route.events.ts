import express from "express";
import { EventController } from "./controller.events";
import { authenticateJWT } from "../../middlewares/auth";

const router = express.Router();

router.post("/", authenticateJWT, EventController.createAEvent);
router.get("/", authenticateJWT, EventController.getAllEvents);
router.get("/:slug", authenticateJWT, EventController.getSingleEvent);
router.put("/:slug", authenticateJWT, EventController.updateEvent);
router.delete("/:slug", authenticateJWT, EventController.deleteEvent);
router.put(
  "/:eventId/register",
  authenticateJWT,
  EventController.registeredIntoEvent
);
export const EventRoutes = router;
