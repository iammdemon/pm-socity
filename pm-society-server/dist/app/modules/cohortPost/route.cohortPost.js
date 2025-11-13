"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CohortPostRoutes = void 0;
// routes.cohortPost.ts
const express_1 = __importDefault(require("express"));
const controller_cohortPost_1 = require("./controller.cohortPost");
const auth_1 = require("../../middlewares/auth");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
router.post("/", auth_1.authenticateJWT, upload.single("image"), controller_cohortPost_1.CohortPostController.createPost);
router.get("/user", auth_1.authenticateJWT, controller_cohortPost_1.CohortPostController.getAllPostsForUser);
router.get("/cohort/:cohortId", auth_1.authenticateJWT, controller_cohortPost_1.CohortPostController.getPostsByCohort);
router.get("/:postId", auth_1.authenticateJWT, controller_cohortPost_1.CohortPostController.getPostById);
router.post("/:postId/reply", auth_1.authenticateJWT, controller_cohortPost_1.CohortPostController.addReply);
router.patch("/:postId/reaction", auth_1.authenticateJWT, controller_cohortPost_1.CohortPostController.toggleReactionOnPost);
router.patch("/:postId/reply/:replyId/reaction", auth_1.authenticateJWT, controller_cohortPost_1.CohortPostController.toggleReactionOnReply);
router.patch("/:postId", auth_1.authenticateJWT, upload.single("image"), // optional image upload
controller_cohortPost_1.CohortPostController.editPost);
router.delete("/:postId", auth_1.authenticateJWT, controller_cohortPost_1.CohortPostController.deletePost);
exports.CohortPostRoutes = router;
