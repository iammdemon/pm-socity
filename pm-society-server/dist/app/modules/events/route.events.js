"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_events_1 = require("./controller.events");
const router = express_1.default.Router();
router.post('/', controller_events_1.EventController.createAEvent);
router.get('/', controller_events_1.EventController.getAllEvents);
router.get('/:slug', controller_events_1.EventController.getSingleEvent);
router.put('/:slug', controller_events_1.EventController.updateEvent);
router.delete('/:slug', controller_events_1.EventController.deleteEvent);
exports.EventRoutes = router;
