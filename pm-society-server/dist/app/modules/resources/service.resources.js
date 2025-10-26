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
const minioClient_1 = require("../../utils/minioClient");
const model_resources_1 = require("./model.resources");
const bucketName = "resources";
const createResourceIntoDB = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    let fileUrl;
    if (file) {
        const { fileUrl: uploadedUrl } = yield minioClient_1.StorageService.uploadFile(bucketName, file);
        fileUrl = uploadedUrl;
    }
    const result = yield model_resources_1.Resource.create(Object.assign(Object.assign({}, payload), { fileUrl }));
    return result;
});
const getAllResources = () => __awaiter(void 0, void 0, void 0, function* () {
    return model_resources_1.Resource.find();
});
const updateResource = (id, updateData, file) => __awaiter(void 0, void 0, void 0, function* () {
    const resource = yield model_resources_1.Resource.findById(id);
    if (!resource)
        throw new Error("Resource not found");
    if (file) {
        // delete old file if exists
        if (resource.fileUrl) {
            yield minioClient_1.StorageService.deleteFile(bucketName, resource.fileUrl);
        }
        // upload new file
        const { fileUrl: newUrl } = yield minioClient_1.StorageService.uploadFile(bucketName, file);
        updateData.fileUrl = newUrl;
    }
    const result = yield model_resources_1.Resource.findByIdAndUpdate(id, updateData, { new: true });
    return result;
});
const deleteResource = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const resource = yield model_resources_1.Resource.findById(id);
    if (!resource)
        throw new Error("Resource not found");
    if (resource.fileUrl) {
        yield minioClient_1.StorageService.deleteFile(bucketName, resource.fileUrl);
    }
    return model_resources_1.Resource.findByIdAndDelete(id);
});
exports.ResourceService = {
    createResourceIntoDB,
    getAllResources,
    updateResource,
    deleteResource,
};
