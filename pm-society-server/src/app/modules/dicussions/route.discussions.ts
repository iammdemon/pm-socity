import express from "express"
import { ForumController } from "./controller.discussions"
import { authenticateJWT } from "../../middlewares/auth"

const router = express.Router()


router.post("/",authenticateJWT, ForumController.createTopic)
router.get("/",authenticateJWT, ForumController.getAllTopics)
router.get("/:topicId",authenticateJWT, ForumController.getTopicById)
router.post("/:topicId/reply",authenticateJWT, ForumController.addReply)
router.patch("/:topicId/reaction",authenticateJWT, ForumController.toggleReactionOnTopic)
router.patch("/:topicId/reply/:replyId/reaction",authenticateJWT, ForumController.toggleReactionOnReply)

export const ForumRoutes = router;