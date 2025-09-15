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
exports.ResourceService = void 0;
const model_resources_1 = require("./model.resources");
const createResourceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_resources_1.Resource.create(payload);
    return result;
});
const getAllResources = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_resources_1.Resource.find();
    return result;
});
const updateResource = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_resources_1.Resource.findByIdAndUpdate(id, updateData, { new: true });
    return result;
});
const deleteResource = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_resources_1.Resource.findByIdAndDelete(id);
    return result;
});
exports.ResourceService = {
    createResourceIntoDB,
    getAllResources,
    updateResource, deleteResource
};
