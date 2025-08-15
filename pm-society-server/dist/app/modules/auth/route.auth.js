"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_auth_1 = require("./controller.auth");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
router.post('/login', controller_auth_1.authController.loginUser);
router.post('/logout', controller_auth_1.authController.logoutUser);
router.get('/me', auth_1.authenticateJWT, controller_auth_1.authController.getMe);
router.post('/change-password', auth_1.authenticateJWT, controller_auth_1.authController.changePassword);
exports.AuthRoutes = router;
