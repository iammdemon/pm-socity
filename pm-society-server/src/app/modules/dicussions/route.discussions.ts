import express from "express";
import { ForumController } from "./controller.discussions";



const router = express.Router();

// Topic routes
router.post("/topics", ForumController.createTopic);
router.get("/topics", ForumController.getAllTopics);
router.get("/topics/:slug",ForumController.getSingleTopic);
router.delete("/topics/:slug",ForumController.deleteTopic);

// Message routes
router.post("/topics/:topicId/messages",ForumController.createMessage);
router.get("/topics/:topicId/messages", ForumController.getMessagesByTopic);

export const ForumRoutes = router;
