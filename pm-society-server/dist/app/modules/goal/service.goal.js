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
Object.defineProperty(exports, "__esModule", { value: true });
exports.goalService = void 0;
const model_goal_1 = require("./model.goal");
const model_users_1 = require("../users/model.users");
const createGoal = (userEmail, goalData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_users_1.User.findOne({ email: userEmail });
    if (!user)
        throw new Error("User not found");
    const goal = new model_goal_1.Goal(Object.assign(Object.assign({}, goalData), { user: user._id }));
    return yield goal.save();
});
const getUserGoals = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_goal_1.Goal.find({ user: userId }).sort({ createdAt: -1 });
});
const updateGoal = (goalId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_goal_1.Goal.findByIdAndUpdate(goalId, data, { new: true });
});
const deleteGoal = (goalId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_goal_1.Goal.findByIdAndDelete(goalId);
});
exports.goalService = {
    createGoal,
    getUserGoals,
    updateGoal,
    deleteGoal,
};
