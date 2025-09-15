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
exports.ResourceController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const service_resources_1 = require("./service.resources");
const createAResource = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_resources_1.ResourceService.createResourceIntoDB(req.body);
        res.status(201).json({
            message: "Resource created successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Error creating Resource:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
const getAllResources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_resources_1.ResourceService.getAllResources();
        res.status(200).json({
            message: "Resources fetched successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Error fetching Resources:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
const updateResource = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = yield service_resources_1.ResourceService.updateResource(id, updatedData);
        if (!result) {
            res.status(404).json({ error: "Resource not found" });
            return;
        }
        res.status(200).json({
            message: "Resource updated successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Error updating Resource:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
const deleteResource = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield service_resources_1.ResourceService.deleteResource(id);
        if (!result) {
            res.status(404).json({ error: "Resource not found" });
            return;
        }
        res.status(200).json({
            message: "Resource deleted successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Error deleting Resource:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.ResourceController = {
    createAResource,
    getAllResources,
    updateResource,
    deleteResource
};
