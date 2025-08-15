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
const createAEventIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_events_1.default.create(payload);
    return result;
});
const getAllEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_events_1.default.find();
    return result;
});
const getSingleEvent = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_events_1.default.findOne({ slug });
    return result;
});
const updateEvent = (slug, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_events_1.default.findOneAndUpdate({ slug }, updateData, { new: true });
    return result;
});
const deleteEvent = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_events_1.default.findOneAndDelete({ slug });
    return result;
});
exports.EventService = {
    createAEventIntoDB,
    getAllEvents,
    getSingleEvent,
    updateEvent, deleteEvent
};
