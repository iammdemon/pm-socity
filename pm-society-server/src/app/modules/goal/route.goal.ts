import express from "express";
import { goalController } from "./controller.goal";
import { authenticateJWT } from "../../middlewares/auth";

const router = express.Router();

router.post("/", authenticateJWT, goalController.createGoal);
router.get("/", authenticateJWT, goalController.getMyGoals);
router.put("/:id", authenticateJWT, goalController.updateGoal);
router.delete("/:id", authenticateJWT, goalController.deleteGoal);

export const GoalRoutes = router;
