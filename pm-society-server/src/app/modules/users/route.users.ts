import express from "express";
import { PaymentController } from "./controller.payment";
import { userController } from "./controller.users";
import { authenticateJWT } from "../../middlewares/auth";

const router = express.Router();

// Payment routes
router.post("/checkout", PaymentController.startCheckout);
router.post(
  "/subscription-checkout",
  PaymentController.startSubscriptionCheckout
);
router.post(
  "/verify-subscription",
  PaymentController.completeSubscriptionRegistration
);
router.post("/verify-payment", PaymentController.verifyPayment);
router.post("/cancel-subscription", PaymentController.cancelSubscription);

// User management routes
router.get("/", userController.getAllUsers);
router.post("/create-admin", userController.createUser);

// Profile routes (require authentication)
router.put("/profile", authenticateJWT, userController.updateUserProfile);
router.patch("/link/:id", authenticateJWT, userController.toggleLink);



// Utility routes
router.get("/generate", userController.generateLink);
router.get("/:userName",authenticateJWT, userController.getUserByUserName);

export const UserRoutes = router;