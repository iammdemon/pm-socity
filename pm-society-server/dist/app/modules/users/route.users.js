"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_payment_1 = require("./controller.payment");
const controller_users_1 = require("./controller.users");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
// Payment routes
router.post("/checkout", controller_payment_1.PaymentController.startCheckout);
router.post("/subscription-checkout", controller_payment_1.PaymentController.startSubscriptionCheckout);
router.post("/verify-subscription", controller_payment_1.PaymentController.completeSubscriptionRegistration);
router.post("/verify-payment", controller_payment_1.PaymentController.verifyPayment);
router.post("/cancel-subscription", controller_payment_1.PaymentController.cancelSubscription);
// User management routes
router.get("/", controller_users_1.userController.getAllUsers);
router.post("/create-admin", controller_users_1.userController.createUser);
// Profile routes (require authentication)
router.put("/profile", auth_1.authenticateJWT, controller_users_1.userController.updateUserProfile);
router.patch("/link/:id", auth_1.authenticateJWT, controller_users_1.userController.toggleLink);
// Utility routes
router.get("/generate", controller_users_1.userController.generateLink);
router.get("/:userName", auth_1.authenticateJWT, controller_users_1.userController.getUserByUserName);
exports.UserRoutes = router;
