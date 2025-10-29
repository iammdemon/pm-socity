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
exports.LearningResourcesController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const service_learning_resources_1 = require("./service.learning-resources");
const addLearningResources = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_learning_resources_1.LearningResourcesService.addLearningResourcesToDB(req.body);
    res.status(201).json({
        message: "Learning resource created successfully",
        data: result,
    });
}));
const getAllLearningResources = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_learning_resources_1.LearningResourcesService.getAllLearningResourcesFromDB();
    res.status(200).json({
        message: "Learning resources fetched successfully",
        data: result,
    });
}));
const updateLearningResources = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield service_learning_resources_1.LearningResourcesService.updateLearningResourcesByIdToDB(id, req.body);
    res.status(200).json({
        message: "Learning resource updated successfully",
        data: result,
    });
}));
const deleteLearningResources = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield service_learning_resources_1.LearningResourcesService.deleteLearningResourcesByIdFromDB(id);
    res.status(200).json({
        message: "Learning resource deleted successfully",
        data: result,
    });
}));
exports.LearningResourcesController = {
    addLearningResources,
    getAllLearningResources,
    updateLearningResources,
    deleteLearningResources,
};
