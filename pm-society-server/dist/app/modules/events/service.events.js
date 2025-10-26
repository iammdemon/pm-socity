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
const model_events_1 = __importDefault(require("./model.events"));
const model_users_1 = require("../users/model.users");
const minioClient_1 = require("../../utils/minioClient");
const BUCKET = "events";
const createAEventIntoDB = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    let imageUrl;
    if (file) {
        const upload = yield minioClient_1.StorageService.uploadFile(BUCKET, file);
        imageUrl = upload.fileUrl;
    }
    const event = yield model_events_1.default.create(Object.assign(Object.assign({}, payload), { image: imageUrl || payload.image }));
    return event;
});
const getAllEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    return model_events_1.default.find().populate("joinedUser", "name email").sort({ createdAt: -1 });
});
const getSingleEvent = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    return model_events_1.default.findOne({ slug }).populate("joinedUser", "name email");
});
const updateEvent = (slug, updateData, file) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield model_events_1.default.findOne({ slug });
    if (!event)
        throw new Error("Event not found");
    if (file) {
        // upload new image
        const upload = yield minioClient_1.StorageService.uploadFile(BUCKET, file);
        updateData.image = upload.fileUrl;
        // delete old one
        if (event.image) {
            yield minioClient_1.StorageService.deleteFile(BUCKET, event.image);
        }
    }
    const updated = yield model_events_1.default.findOneAndUpdate({ slug }, updateData, { new: true });
    return updated;
});
const deleteEvent = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield model_events_1.default.findOne({ slug });
    if (!event)
        throw new Error("Event not found");
    if (event.image) {
        yield minioClient_1.StorageService.deleteFile(BUCKET, event.image);
    }
    yield model_events_1.default.findOneAndDelete({ slug });
    return event;
});
const registeredIntoEvent = (eventId, email) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user = yield model_users_1.User.findOne({ email });
    if (!user)
        throw new Error("User not found");
    const event = yield model_events_1.default.findById(eventId);
    if (!event)
        throw new Error("Event not found");
    const alreadyJoined = (_a = event.joinedUser) === null || _a === void 0 ? void 0 : _a.some((id) => id.toString() === user._id.toString());
    if (alreadyJoined)
        throw new Error("User already registered for this event");
    (_b = event.joinedUser) === null || _b === void 0 ? void 0 : _b.push(user._id);
    yield event.save();
    return yield model_events_1.default.findById(eventId).populate("joinedUser", "name email");
});
exports.EventService = {
    createAEventIntoDB,
    getAllEvents,
    getSingleEvent,
    updateEvent,
    deleteEvent,
    registeredIntoEvent,
};
