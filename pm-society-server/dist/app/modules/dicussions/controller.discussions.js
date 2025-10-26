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
const createTopic = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_discussions_1.ForumService.createTopic(req.body, req.user.email, req.file);
    res.status(201).json({ message: "Topic created successfully", data: result });
}));
const getAllTopics = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_discussions_1.ForumService.getAllTopics();
    res.status(200).json({ message: "Topics Fetched successfully", data: result });
}));
const getTopicById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { topicId } = req.params;
    const result = yield service_discussions_1.ForumService.getTopicById(topicId);
    res.status(200).json({ message: "Topic Fetched successfully", data: result });
}));
const addReply = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { topicId } = req.params;
    const result = yield service_discussions_1.ForumService.addReplyToTopic(topicId, req.body, req.user.email);
    res.status(201).json({ message: "Reply added successfully", data: result });
}));
const toggleReactionOnTopic = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { topicId } = req.params;
    const result = yield service_discussions_1.ForumService.toggleReactionOnTopic(topicId, req.user.email);
    res.status(200).json({ message: "Reaction toggled successfully", data: result });
}));
const toggleReactionOnReply = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { topicId, replyId } = req.params;
    const result = yield service_discussions_1.ForumService.toggleReactionOnReply(topicId, replyId, req.user.email);
    res.status(200).json({ message: "Reaction toggled successfully", data: result });
}));
exports.ForumController = {
    createTopic,
    getAllTopics,
    getTopicById,
    addReply,
    toggleReactionOnTopic,
    toggleReactionOnReply
};
