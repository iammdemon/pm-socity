"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_goal_1 = require("./controller.goal");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
router.post("/", auth_1.authenticateJWT, controller_goal_1.goalController.createGoal);
router.get("/", auth_1.authenticateJWT, controller_goal_1.goalController.getMyGoals);
router.put("/:id", auth_1.authenticateJWT, controller_goal_1.goalController.updateGoal);
router.delete("/:id", auth_1.authenticateJWT, controller_goal_1.goalController.deleteGoal);
exports.GoalRoutes = router;
