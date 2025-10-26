import express from "express";
import multer from "multer";
import { EventController } from "./controller.events";
import { authenticateJWT } from "../../middlewares/auth";

const router = express.Router();
const upload = multer();

router.post("/", authenticateJWT, upload.single("image"), EventController.createAEvent);
router.get("/", authenticateJWT, EventController.getAllEvents);
router.get("/:slug", authenticateJWT, EventController.getSingleEvent);
router.put("/:slug", authenticateJWT, upload.single("image"), EventController.updateEvent);
router.delete("/:slug", authenticateJWT, EventController.deleteEvent);
router.put("/:eventId/register", authenticateJWT, EventController.registeredIntoEvent);

export const EventRoutes = router;
