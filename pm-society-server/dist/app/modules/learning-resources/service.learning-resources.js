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
exports.LearningResourcesService = void 0;
const model_learning_resources_1 = require("./model.learning-resources");
const addLearningResourcesToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_learning_resources_1.LearningResource.create(payload);
});
const getAllLearningResourcesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_learning_resources_1.LearningResource.find();
});
const updateLearningResourcesByIdToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_learning_resources_1.LearningResource.findByIdAndUpdate(id, payload, { new: true });
});
const deleteLearningResourcesByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_learning_resources_1.LearningResource.findByIdAndDelete(id);
});
exports.LearningResourcesService = {
    addLearningResourcesToDB,
    getAllLearningResourcesFromDB,
    updateLearningResourcesByIdToDB,
    deleteLearningResourcesByIdFromDB
};
