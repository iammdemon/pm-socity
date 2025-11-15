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
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_payment_1 = require("./controller.payment");
const controller_users_1 = require("./controller.users");
const auth_1 = require("../../middlewares/auth");
const utils_user_1 = require("./utils.user");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const Upload = (0, multer_1.default)();
// Payment routes
router.post("/checkout", controller_payment_1.PaymentController.startCheckout);
router.post("/subscription-checkout", controller_payment_1.PaymentController.startSubscriptionCheckout);
router.post("/verify-subscription", controller_payment_1.PaymentController.completeSubscriptionRegistration);
router.post("/verify-payment", controller_payment_1.PaymentController.verifyPayment);
router.post("/cancel-subscription", controller_payment_1.PaymentController.cancelSubscription);
router.post("/linkedin-payment", auth_1.authenticateJWT, controller_payment_1.PaymentController.startLinkedinSupportCheckout);
router.post("/verify-linkedin-payment", auth_1.authenticateJWT, controller_payment_1.PaymentController.completeLinkedinSupportPurchase);
// User management routes
router.get("/", controller_users_1.userController.getAllUsers);
router.post("/create-admin", controller_users_1.userController.createUser);
// Profile routes (require authentication)
router.put("/profile", auth_1.authenticateJWT, controller_users_1.userController.updateUserProfile);
router.patch("/link/:id", auth_1.authenticateJWT, controller_users_1.userController.toggleLink);
// Utility routes
router.get("/generate", controller_users_1.userController.generateLink);
router.get("/:userName", auth_1.authenticateJWT, controller_users_1.userController.getUserByUserName);
router.post("/reset-passwords", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, utils_user_1.resetAllPasswords)();
        res.json({ message: "Passwords reset successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.put("/avatar", auth_1.authenticateJWT, Upload.single("avatar"), controller_users_1.userController.updateAvatar);
exports.UserRoutes = router;
