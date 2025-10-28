"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_discussions_1 = require("./controller.discussions");
const auth_1 = require("../../middlewares/auth");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
router.post("/", auth_1.authenticateJWT, upload.single("image"), controller_discussions_1.ForumController.createTopic);
router.get("/", auth_1.authenticateJWT, controller_discussions_1.ForumController.getAllTopics);
router.get("/:topicId", auth_1.authenticateJWT, controller_discussions_1.ForumController.getTopicById);
router.post("/:topicId/reply", auth_1.authenticateJWT, controller_discussions_1.ForumController.addReply);
router.patch("/:topicId/reaction", auth_1.authenticateJWT, controller_discussions_1.ForumController.toggleReactionOnTopic);
router.patch("/:topicId/reply/:replyId/reaction", auth_1.authenticateJWT, controller_discussions_1.ForumController.toggleReactionOnReply);
router.patch("/:topicId", auth_1.authenticateJWT, upload.single("image"), // optional image upload
controller_discussions_1.ForumController.editTopic);
router.delete("/:topicId", auth_1.authenticateJWT, controller_discussions_1.ForumController.deleteTopic);
exports.ForumRoutes = router;
