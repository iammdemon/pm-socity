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
exports.EventService = void 0;
const model_users_1 = require("../users/model.users");
const model_events_1 = __importDefault(require("./model.events"));
const createAEventIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_events_1.default.create(payload);
    return result;
});
const getAllEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_events_1.default.find().populate("joinedUser", "name email");
    return result;
});
const getSingleEvent = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_events_1.default.findOne({ slug });
    return result;
});
const updateEvent = (slug, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_events_1.default.findOneAndUpdate({ slug }, updateData, {
        new: true,
    });
    return result;
});
const deleteEvent = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_events_1.default.findOneAndDelete({ slug });
    return result;
});
const registeredIntoEvent = (eventId, email) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // 1️⃣ Check if user exists
    const user = yield model_users_1.User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    // 2️⃣ Check if event exists
    const event = yield model_events_1.default.findById(eventId);
    if (!event) {
        throw new Error("Event not found");
    }
    // 3️⃣ Prevent duplicate registration
    const alreadyJoined = (_a = event.joinedUser) === null || _a === void 0 ? void 0 : _a.some((id) => id.toString() === user._id.toString());
    if (alreadyJoined) {
        throw new Error("User already registered for this event");
    }
    // 4️⃣ Add user to joinedUser array
    (_b = event.joinedUser) === null || _b === void 0 ? void 0 : _b.push(user._id);
    yield event.save();
    // 5️⃣ Populate user info if needed
    const updatedEvent = yield model_events_1.default.findById(eventId).populate("joinedUser", "name email");
    return updatedEvent;
});
exports.EventService = {
    createAEventIntoDB,
    getAllEvents,
    getSingleEvent,
    updateEvent,
    deleteEvent,
    registeredIntoEvent,
};
