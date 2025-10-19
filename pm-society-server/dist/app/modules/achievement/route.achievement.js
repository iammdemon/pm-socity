"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_achievement_1 = require("./controller.achievement");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
router.post("/", auth_1.authenticateJWT, controller_achievement_1.achievementController.createAchievement);
router.get("/", auth_1.authenticateJWT, controller_achievement_1.achievementController.getMyAchievements);
router.put("/:id", auth_1.authenticateJWT, controller_achievement_1.achievementController.updateAchievement);
router.delete("/:id", auth_1.authenticateJWT, controller_achievement_1.achievementController.deleteAchievement);
exports.AchievementRoutes = router;
