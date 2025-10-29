"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningResourcesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const controller_learning_resources_1 = require("./controller.learning-resources");
const router = express_1.default.Router();
router.post("/", auth_1.authenticateJWT, controller_learning_resources_1.LearningResourcesController.addLearningResources);
router.get("/", auth_1.authenticateJWT, controller_learning_resources_1.LearningResourcesController.getAllLearningResources);
router.patch("/:id", auth_1.authenticateJWT, controller_learning_resources_1.LearningResourcesController.updateLearningResources);
router.delete("/:id", auth_1.authenticateJWT, controller_learning_resources_1.LearningResourcesController.deleteLearningResources);
exports.LearningResourcesRoutes = router;
