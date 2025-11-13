// routes.cohortPost.ts
import express from "express";
import { CohortPostController } from "./controller.cohortPost";
import { authenticateJWT } from "../../middlewares/auth";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post(
  "/",
  authenticateJWT,
  upload.single("image"),
  CohortPostController.createPost
);

router.get("/user", authenticateJWT, CohortPostController.getAllPostsForUser);
router.get("/cohort/:cohortId", authenticateJWT, CohortPostController.getPostsByCohort);
router.get("/:postId", authenticateJWT, CohortPostController.getPostById);

router.post("/:postId/reply", authenticateJWT, CohortPostController.addReply);

router.patch(
  "/:postId/reaction",
  authenticateJWT,
  CohortPostController.toggleReactionOnPost
);

router.patch(
  "/:postId/reply/:replyId/reaction",
  authenticateJWT,
  CohortPostController.toggleReactionOnReply
);

router.patch(
  "/:postId",
  authenticateJWT,
  upload.single("image"), // optional image upload
  CohortPostController.editPost
);

router.delete("/:postId", authenticateJWT, CohortPostController.deletePost);

export const CohortPostRoutes = router;