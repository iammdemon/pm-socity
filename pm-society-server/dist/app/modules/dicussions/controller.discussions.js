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
exports.ForumController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const service_discussions_1 = require("./service.discussions");
// Create topic
const createTopic = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_discussions_1.ForumService.createTopic(req.body);
    res.status(201).json({
        message: "Topic created successfully",
        data: result,
    });
}));
// Get all topics
const getAllTopics = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_discussions_1.ForumService.getAllTopics();
    res.status(200).json({
        message: "Topics fetched successfully",
        data: result,
    });
}));
// Get single topic
const getSingleTopic = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const result = yield service_discussions_1.ForumService.getSingleTopic(slug);
    if (!result) {
        res.status(404).json({ error: "Topic not found" });
        return;
    }
    res.status(200).json({
        message: "Topic fetched successfully",
        data: result,
    });
}));
// Create message
const createMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topicId = req.params.topicId;
    const result = yield service_discussions_1.ForumService.createMessage(topicId, req.body);
    res.status(201).json({
        message: "Message added successfully",
        data: result,
    });
}));
// Get all messages by topic
const getMessagesByTopic = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topicId = req.params.topicId;
    const result = yield service_discussions_1.ForumService.getMessagesByTopic(topicId);
    res.status(200).json({
        message: "Messages fetched successfully",
        data: result,
    });
}));
const deleteTopic = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slug;
        console.log(slug);
        const result = yield service_discussions_1.ForumService.deleteTopic(slug);
        console.log(result);
        if (!result) {
            res.status(404).json({ error: "Topic not found" });
            return;
        }
        res.status(200).json({
            message: "Topic deleted successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Error deleting Topic:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.ForumController = {
    createTopic,
    getAllTopics,
    getSingleTopic,
    createMessage,
    getMessagesByTopic,
    deleteTopic
};
