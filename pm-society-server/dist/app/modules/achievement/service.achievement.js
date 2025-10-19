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
exports.achievementService = void 0;
const model_achievement_1 = require("./model.achievement");
const model_users_1 = require("../users/model.users");
const createAchievement = (email, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_users_1.User.findOne({ email });
    if (!user)
        throw new Error("User not found");
    const achievement = new model_achievement_1.Achievement(Object.assign(Object.assign({}, data), { user: user._id }));
    return yield achievement.save();
});
const getUserAchievements = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_users_1.User.findOne({ email });
    if (!user)
        throw new Error("User not found");
    return yield model_achievement_1.Achievement.find({ user: user._id }).sort({ date: -1 });
});
const updateAchievement = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_achievement_1.Achievement.findByIdAndUpdate(id, data, { new: true });
});
const deleteAchievement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_achievement_1.Achievement.findByIdAndDelete(id);
});
exports.achievementService = {
    createAchievement,
    getUserAchievements,
    updateAchievement,
    deleteAchievement,
};
