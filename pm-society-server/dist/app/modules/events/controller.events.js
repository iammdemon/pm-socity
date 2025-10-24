"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const service_events_1 = require("./service.events");
const createAEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_events_1.EventService.createAEventIntoDB(req.body);
    res.status(201).json({
        message: "Event created successfully",
        data: result,
    });
}));
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_events_1.EventService.getAllEvents();
    res.status(200).json({
        message: "Events fetched successfully",
        data: result,
    });
});
const getSingleEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const result = yield service_events_1.EventService.getSingleEvent(slug);
    if (!result) {
        res.status(404).json({ error: "Event not found" });
        return;
    }
    res.status(200).json({
        message: "Event fetched successfully",
        data: result,
    });
}));
const updateEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const updatedData = req.body;
    const result = yield service_events_1.EventService.updateEvent(slug, updatedData);
    if (!result) {
        res.status(404).json({ error: "Event not found" });
        return;
    }
    res.status(200).json({
        message: "Event updated successfully",
        data: result,
    });
}));
const deleteEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const result = yield service_events_1.EventService.deleteEvent(slug);
    if (!result) {
        res.status(404).json({ error: "Event not found" });
        return;
    }
    res.status(200).json({
        message: "Event deleted successfully",
        data: result,
    });
}));
const registeredIntoEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    const eventId = req.params.eventId;
    const result = yield service_events_1.EventService.registeredIntoEvent(eventId, email);
    res.status(200).json({
        success: true,
        message: "Event registered successfully",
        data: result,
    });
}));
exports.EventController = {
    createAEvent,
    getAllEvents,
    getSingleEvent,
    updateEvent,
    deleteEvent,
    registeredIntoEvent,
};
