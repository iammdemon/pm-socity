import express from "express";
import { authenticateJWT } from "../../middlewares/auth";
import { LearningResourcesController } from "./controller.learning-resources";

const router = express.Router();

router.post("/",authenticateJWT, LearningResourcesController.addLearningResources);
router.get("/",authenticateJWT, LearningResourcesController.getAllLearningResources);
router.patch("/:id",authenticateJWT, LearningResourcesController.updateLearningResources);
router.delete("/:id",authenticateJWT, LearningResourcesController.deleteLearningResources);


export const LearningResourcesRoutes = router;