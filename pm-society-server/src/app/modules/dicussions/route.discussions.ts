import express from "express";
import { ForumController } from "./controller.discussions";
import { authenticateJWT } from "../../middlewares/auth";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post(
  "/",
  authenticateJWT,
  upload.single("image"),
  ForumController.createTopic
);
router.get("/", authenticateJWT, ForumController.getAllTopics);
router.get("/:topicId", authenticateJWT, ForumController.getTopicById);
router.post("/:topicId/reply", authenticateJWT, ForumController.addReply);
router.patch(
  "/:topicId/reaction",
  authenticateJWT,
  ForumController.toggleReactionOnTopic
);
router.patch(
  "/:topicId/reply/:replyId/reaction",
  authenticateJWT,
  ForumController.toggleReactionOnReply
);
router.patch(
  "/:topicId",
  authenticateJWT,
  upload.single("image"), // optional image upload
  ForumController.editTopic
);
router.delete("/:topicId", authenticateJWT, ForumController.deleteTopic);

export const ForumRoutes = router;
