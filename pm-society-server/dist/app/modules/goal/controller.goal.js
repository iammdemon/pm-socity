"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.goalController = void 0;
const service_goal_1 = require("./service.goal");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const model_users_1 = require("../users/model.users");
// Create Goal
const createGoal = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.email)) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const goal = yield service_goal_1.goalService.createGoal(req.user.email, req.body);
    res.status(201).json({ message: "Goal created", data: goal });
}));
// Get Current User Goals
const getMyGoals = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.email)) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const user = yield model_users_1.User.findOne({ email: req.user.email });
    if (!user)
        res.status(404).json({ message: "User not found" });
    const goals = yield service_goal_1.goalService.getUserGoals(user._id);
    res.status(200).json({ message: "Goals retrieved", data: goals });
}));
// Update Goal
const updateGoal = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedGoal = yield service_goal_1.goalService.updateGoal(req.params.id, req.body);
    res.status(200).json({ message: "Goal updated", data: updatedGoal });
}));
// Delete Goal
const deleteGoal = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield service_goal_1.goalService.deleteGoal(req.params.id);
    res.status(200).json({ message: "Goal deleted" });
}));
exports.goalController = { createGoal, getMyGoals, updateGoal, deleteGoal };
