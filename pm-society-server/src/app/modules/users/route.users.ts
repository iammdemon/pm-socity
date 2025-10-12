import express from "express";
import { PaymentController } from "./controller.payment";
import { userController } from "./controller.users";
import { authenticateJWT } from "../../middlewares/auth";


const router = express.Router();

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

router.get("/", userController.getAllUsers);
router.post("/create-admin", userController.createUser);

router.put("/profile",authenticateJWT, userController.updateUserProfile);
router.post("/link/:id", userController.linkUserController);
router.post("/unlink/:id", userController.unlinkUserController);



export const UserRoutes = router;
