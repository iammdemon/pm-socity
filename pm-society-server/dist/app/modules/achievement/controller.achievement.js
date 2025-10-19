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
exports.achievementController = void 0;
const service_achievement_1 = require("./service.achievement");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
// Create Achievement
const createAchievement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.email))
        res.status(401).json({ message: "Unauthorized" });
    const achievement = yield service_achievement_1.achievementService.createAchievement(req.user.email, req.body);
    res.status(201).json({ message: "Achievement created", data: achievement });
}));
// Get Current User Achievements
const getMyAchievements = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.email))
        res.status(401).json({ message: "Unauthorized" });
    const achievements = yield service_achievement_1.achievementService.getUserAchievements(req.user.email);
    res.status(200).json({ message: "Achievements retrieved", data: achievements });
}));
// Update Achievement
const updateAchievement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield service_achievement_1.achievementService.updateAchievement(req.params.id, req.body);
    res.status(200).json({ message: "Achievement updated", data: updated });
}));
// Delete Achievement
const deleteAchievement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield service_achievement_1.achievementService.deleteAchievement(req.params.id);
    res.status(200).json({ message: "Achievement deleted" });
}));
exports.achievementController = {
    createAchievement,
    getMyAchievements,
    updateAchievement,
    deleteAchievement,
};
