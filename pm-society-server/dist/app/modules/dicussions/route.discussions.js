"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_discussions_1 = require("./controller.discussions");
const router = express_1.default.Router();
// Topic routes
router.post("/topics", controller_discussions_1.ForumController.createTopic);
router.get("/topics", controller_discussions_1.ForumController.getAllTopics);
router.get("/topics/:slug", controller_discussions_1.ForumController.getSingleTopic);
router.delete("/topics/:slug", controller_discussions_1.ForumController.deleteTopic);
// Message routes
router.post("/topics/:topicId/messages", controller_discussions_1.ForumController.createMessage);
router.get("/topics/:topicId/messages", controller_discussions_1.ForumController.getMessagesByTopic);
exports.ForumRoutes = router;
