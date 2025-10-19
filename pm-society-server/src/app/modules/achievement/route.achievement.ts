import express from "express";
import { achievementController } from "./controller.achievement";
import { authenticateJWT } from "../../middlewares/auth";

const router = express.Router();

router.post("/", authenticateJWT, achievementController.createAchievement);
router.get("/", authenticateJWT, achievementController.getMyAchievements);
router.put("/:id", authenticateJWT, achievementController.updateAchievement);
router.delete("/:id", authenticateJWT, achievementController.deleteAchievement);

export const AchievementRoutes = router;
