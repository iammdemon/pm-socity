import express from "express";
import { PaymentController } from "./controller.payment";
import { userController } from "./controller.users";
import { authenticateJWT } from "../../middlewares/auth";
import { resetAllPasswords } from "./utils.user";
import multer from "multer";

const router = express.Router();
const Upload = multer();

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
router.post(
  "/linkedin-payment",
  authenticateJWT,
  PaymentController.startLinkedinSupportCheckout
);
router.post(
  "/verify-linkedin-payment",
  authenticateJWT,
  PaymentController.completeLinkedinSupportPurchase
);

// User management routes
router.get("/", userController.getAllUsers);
router.post("/create-admin", userController.createUser);

// Profile routes (require authentication)
router.put("/profile", authenticateJWT, userController.updateUserProfile);
router.patch("/link/:id", authenticateJWT, userController.toggleLink);

// Utility routes
router.get("/generate", userController.generateLink);
router.get("/:userName", authenticateJWT, userController.getUserByUserName);
router.post("/reset-passwords", async (req, res) => {
  try {
    await resetAllPasswords();
    res.json({ message: "Passwords reset successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});
router.put(
  "/avatar",
  authenticateJWT,
  Upload.single("avatar"),
  userController.updateAvatar
);

export const UserRoutes = router;
