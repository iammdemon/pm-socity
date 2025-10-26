"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const controller_events_1 = require("./controller.events");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
router.post("/", auth_1.authenticateJWT, upload.single("image"), controller_events_1.EventController.createAEvent);
router.get("/", auth_1.authenticateJWT, controller_events_1.EventController.getAllEvents);
router.get("/:slug", auth_1.authenticateJWT, controller_events_1.EventController.getSingleEvent);
router.put("/:slug", auth_1.authenticateJWT, upload.single("image"), controller_events_1.EventController.updateEvent);
router.delete("/:slug", auth_1.authenticateJWT, controller_events_1.EventController.deleteEvent);
router.put("/:eventId/register", auth_1.authenticateJWT, controller_events_1.EventController.registeredIntoEvent);
exports.EventRoutes = router;
