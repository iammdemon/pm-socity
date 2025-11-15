import { Request, Response } from "express";
import { User } from "./model.users";
import { PaymentService, PACKAGE_PRICES } from "./service.payment";
import catchAsync from "../../utils/catchAsync";
import { sendWelcomeEmail } from "../../utils/sendWelcomeEmail";
import { generateUsernameFromEmail } from "./utils.user";
import { AuthRequest } from "../dicussions/controller.discussions";

// your existing type guard
function isOneTimePackage(
  pkg: any
): pkg is { amount: number; type: "one_time" } {
  return pkg && pkg.type === "one_time";
}

const startLinkedinSupportCheckout = catchAsync(
  async (req: AuthRequest, res) => {
    const userEmail = req.user?.email;
    if (!userEmail) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const packageType = "LINKEDIN_SUPPORT";
    const paymentIntent = await PaymentService.createPaymentIntent(packageType);
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      packageType,
    });
  }
);

const completeLinkedinSupportPurchase = catchAsync(
  async (req: AuthRequest, res) => {
    const { paymentIntentId } = req.body;
    const userEmail = req.user?.email;
    if (!userEmail) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }
    if (!paymentIntentId) {
      res.status(400).json({ error: "Payment intent ID is required" });
      return;
    }
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const paymentIntent = await PaymentService.verifyPayment(paymentIntentId);
    if (paymentIntent.status !== "succeeded") {
      res.status(400).json({ error: "Payment not completed" });
      return;
    }

    await User.findOneAndUpdate(
      { email: userEmail },
      {
        linkedinSupport: "active",
      }
    );

  console.log("payment completed")

    res.json({
      success: true,
      message: "LinkedIn support purchase completed successfully",
    });
  }
);

const startCheckout = catchAsync(async (req: Request, res: Response) => {
  const { packageType, subscriptionType } = req.body;

  const pkg = PACKAGE_PRICES[packageType as keyof typeof PACKAGE_PRICES];
  if (!pkg) {
    res.status(400).json({ error: "Invalid package type" });
    return;
  }

  // for recurring packages, ensure subscriptionType is present
  if (!isOneTimePackage(pkg) && !subscriptionType) {
    res
      .status(400)
      .json({ error: "Subscription type is required for this package" });
    return;
  }

  const paymentIntent = await PaymentService.createPaymentIntent(
    packageType,
    subscriptionType
  );

  res.status(200).json({
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  });
});

const startSubscriptionCheckout = catchAsync(
  async (req: Request, res: Response) => {
    const { packageType, subscriptionType, email, name } = req.body;

    if (!packageType || !subscriptionType || !email || !name) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Check if user already exists
    const exists = await User.isUserExistsByEmail(email);
    if (exists) {
      res.status(400).json({ error: "Email already registered" });
      return;
    }

    const customer = await PaymentService.createCustomer(email, name);
    const subscription = await PaymentService.createSubscription(
      customer.id,
      packageType,
      subscriptionType
    );

    const latestInvoice = subscription.latest_invoice;

    let paymentIntentClientSecret: string | undefined;

    if (latestInvoice && typeof latestInvoice !== "string") {
      const paymentIntent = (latestInvoice as any).confirmation_secret;
      if (paymentIntent && typeof paymentIntent !== "string") {
        paymentIntentClientSecret = paymentIntent.client_secret;
      }
    }

    if (!paymentIntentClientSecret) {
      console.error(
        "PaymentIntent missing or malformed on subscription:",
        subscription
      );
      res
        .status(500)
        .json({ error: "Payment intent not available yet. Try again later." });
      return;
    }

    res.status(200).json({
      subscriptionId: subscription.id,
      clientSecret: paymentIntentClientSecret,
      customerId: customer.id,
    });
  }
);

// New endpoint for completing subscription registration
const completeSubscriptionRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { subscriptionId, customerId, password } = req.body;

    if (!subscriptionId || !customerId || !password) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Get subscription details from Stripe
    const subscription = await PaymentService.getSubscription(subscriptionId);

    if (subscription.status !== "active") {
      res.status(400).json({ error: "Subscription is not active" });
      return;
    }

    // Get customer details
    const customerResponse = await PaymentService.getCustomer(customerId);

    // Type guard to ensure we have a Customer object, not a DeletedCustomer
    if (!customerResponse || (customerResponse as any).deleted) {
      res.status(400).json({ error: "Customer not found or deleted" });
      return;
    }

    const customer = customerResponse as any; // Type assertion for Customer object

    if (!customer.email || !customer.name) {
      res.status(400).json({ error: "Customer details incomplete" });
      return;
    }

    // Check if user already exists (double-check)
    const exists = await User.isUserExistsByEmail(customer.email);
    if (exists) {
      res.status(400).json({ error: "Email already registered" });
      return;
    }

    // Extract package info from subscription
    const subscriptionItem = subscription.items.data[0];
    const priceId = subscriptionItem.price.id;

    // Find package type from price ID
    let packageType: string = "";
    let subscriptionType: "monthly" | "yearly" = "monthly";

    for (const [pkg, config] of Object.entries(PACKAGE_PRICES)) {
      if (!isOneTimePackage(config)) {
        if (config.monthly.priceId === priceId) {
          packageType = pkg;
          subscriptionType = "monthly";
          break;
        } else if (config.yearly.priceId === priceId) {
          packageType = pkg;
          subscriptionType = "yearly";
          break;
        }
      }
    }

    if (!packageType) {
      res.status(400).json({ error: "Could not determine package type" });
      return;
    }

    // Calculate subscription end date
    let subscriptionEndDate: Date = new Date();
    if (subscriptionType === "monthly") {
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
    } else {
      subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1);
    }

    const userName = await generateUsernameFromEmail(customer.email);

    // Create user with subscription details
    const user = await User.create({
      email: customer.email,
      name: customer.name,
      phoneNumber: customer.phone,
      userName: userName,
      password,
      packageType,
      subscriptionType,
      amount: subscriptionItem.price.unit_amount,
      subscriptionStatus: "active",
      subscriptionEndDate,
      subscriptionId: subscription.id,
      customerId: customer.id,
    });

    // Send welcome email
    // await sendWelcomeEmail({
    //   to: user.email,
    //   userName: user.name,
    //   packageType: user.packageType!,
    //   email: user.email,
    // });

    res.json({
      message: "Subscription registration complete",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        packageType: user.packageType,
        subscriptionType: user.subscriptionType,
        subscriptionStatus: user.subscriptionStatus,
        subscriptionEndDate: user.subscriptionEndDate,
      },
    });
  }
);

const verifyPayment = catchAsync(async (req: Request, res: Response) => {
  const { paymentIntentId, email, name, password } = req.body;

  const exists = await User.isUserExistsByEmail(email);
  if (exists) {
    console.error("❌ Verify failed: email already registered", email);
    res.status(400).json({ message: "Email already registered" });
    return;
  }

  const paymentIntent = await PaymentService.verifyPayment(paymentIntentId);
  if (paymentIntent.status !== "succeeded") {
    console.error("❌ Verify failed: PI not succeeded", paymentIntent.status);
    res.status(400).json({ message: "Payment not completed" });
    return;
  }

  const { packageType, subscriptionType } = paymentIntent.metadata;
  console.log("pkgh", packageType, subscriptionType);

  if (subscriptionType !== "one_time") {
    console.error("❌ Verify failed: wrong subscriptionType", subscriptionType);
    res
      .status(400)
      .json({ message: "Use subscription endpoint for recurring payments" });
    return;
  }

  // calculate subscriptionEndDate
  let subscriptionEndDate: Date | undefined = undefined;
  switch (packageType) {
    case "IGNITE":
      subscriptionEndDate = new Date();
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 2);
      break;
    case "ELEVATE":
      subscriptionEndDate = new Date();
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 3);
      break;
    case "ASCEND":
      subscriptionEndDate = new Date();
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 6);
      break; 
    default:
      break;
  }

  const userName = await generateUsernameFromEmail(email);

  // Create user with subscription details

  const user = await User.create({
    email,
    name,
    userName: userName,
    password,
    packageType,
    subscriptionType: "one_time",
    amount: paymentIntent.amount,
    subscriptionStatus: subscriptionEndDate ? "active" : undefined,
    subscriptionEndDate,
  });

  console.log("User created:", user);

  // Send welcome email
  // await sendWelcomeEmail({
  //   to: user.email,
  //   userName: user.name,
  //   packageType: user.packageType!,
  //   email: user.email,

  // });

  res.json({
    message: "Registration complete",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      packageType: user.packageType,
      subscriptionType: user.subscriptionType,
      subscriptionStatus: user.subscriptionStatus,
      subscriptionEndDate: user.subscriptionEndDate,
    },
  });
});

const cancelSubscription = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.body;
  const user = await User.findById(userId);

  if (!user || !user.subscriptionId) {
    res.status(404).json({ message: "User or subscription not found" });
    return;
  }

  const subscription = await PaymentService.cancelSubscription(
    user.subscriptionId
  );

  await User.findByIdAndUpdate(userId, { subscriptionStatus: "canceled" });

  res.json({ message: "Subscription canceled successfully", subscription });
});

export const PaymentController = {
  startCheckout,
  startSubscriptionCheckout,
  completeSubscriptionRegistration,
  verifyPayment,
  cancelSubscription,
  startLinkedinSupportCheckout,
  completeLinkedinSupportPurchase
};
