"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_resources_1 = require("./controller.resources");
const router = express_1.default.Router();
router.post('/', controller_resources_1.ResourceController.createAResource);
router.get('/', controller_resources_1.ResourceController.getAllResources);
router.put('/:id', controller_resources_1.ResourceController.updateResource);
router.delete('/:id', controller_resources_1.ResourceController.deleteResource);
exports.ResourceRoutes = router;
