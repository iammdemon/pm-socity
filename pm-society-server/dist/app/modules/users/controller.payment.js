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
exports.PaymentController = void 0;
const model_users_1 = require("./model.users");
const service_payment_1 = require("./service.payment");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendWelcomeEmail_1 = require("../../utils/sendWelcomeEmail");
// your existing type guard
function isOneTimePackage(pkg) {
    return pkg && pkg.type === "one_time";
}
const startCheckout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { packageType, subscriptionType } = req.body;
    const pkg = service_payment_1.PACKAGE_PRICES[packageType];
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
    const paymentIntent = yield service_payment_1.PaymentService.createPaymentIntent(packageType, subscriptionType);
    res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
    });
}));
const startSubscriptionCheckout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { packageType, subscriptionType, email, name } = req.body;
    if (!packageType || !subscriptionType || !email || !name) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    // Check if user already exists
    const exists = yield model_users_1.User.isUserExistsByEmail(email);
    if (exists) {
        res.status(400).json({ error: "Email already registered" });
        return;
    }
    const customer = yield service_payment_1.PaymentService.createCustomer(email, name);
    const subscription = yield service_payment_1.PaymentService.createSubscription(customer.id, packageType, subscriptionType);
    const latestInvoice = subscription.latest_invoice;
    let paymentIntentClientSecret;
    if (latestInvoice && typeof latestInvoice !== "string") {
        const paymentIntent = latestInvoice.confirmation_secret;
        if (paymentIntent && typeof paymentIntent !== "string") {
            paymentIntentClientSecret = paymentIntent.client_secret;
        }
    }
    if (!paymentIntentClientSecret) {
        console.error("PaymentIntent missing or malformed on subscription:", subscription);
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
}));
// New endpoint for completing subscription registration
const completeSubscriptionRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subscriptionId, customerId, password } = req.body;
    if (!subscriptionId || !customerId || !password) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    // Get subscription details from Stripe
    const subscription = yield service_payment_1.PaymentService.getSubscription(subscriptionId);
    if (subscription.status !== "active") {
        res.status(400).json({ error: "Subscription is not active" });
        return;
    }
    // Get customer details
    const customerResponse = yield service_payment_1.PaymentService.getCustomer(customerId);
    // Type guard to ensure we have a Customer object, not a DeletedCustomer
    if (!customerResponse || customerResponse.deleted) {
        res.status(400).json({ error: "Customer not found or deleted" });
        return;
    }
    const customer = customerResponse; // Type assertion for Customer object
    if (!customer.email || !customer.name) {
        res.status(400).json({ error: "Customer details incomplete" });
        return;
    }
    // Check if user already exists (double-check)
    const exists = yield model_users_1.User.isUserExistsByEmail(customer.email);
    if (exists) {
        res.status(400).json({ error: "Email already registered" });
        return;
    }
    // Extract package info from subscription
    const subscriptionItem = subscription.items.data[0];
    const priceId = subscriptionItem.price.id;
    // Find package type from price ID
    let packageType = "";
    let subscriptionType = "monthly";
    for (const [pkg, config] of Object.entries(service_payment_1.PACKAGE_PRICES)) {
        if (!isOneTimePackage(config)) {
            if (config.monthly.priceId === priceId) {
                packageType = pkg;
                subscriptionType = "monthly";
                break;
            }
            else if (config.yearly.priceId === priceId) {
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
    let subscriptionEndDate = new Date();
    if (subscriptionType === "monthly") {
        subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
    }
    else {
        subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1);
    }
    // Create user with subscription details
    const user = yield model_users_1.User.create({
        email: customer.email,
        name: customer.name,
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
    yield (0, sendWelcomeEmail_1.sendWelcomeEmail)({
        to: user.email,
        userName: user.name,
        packageType: user.packageType,
        subscriptionType: user.subscriptionType,
        subscriptionEndDate: user.subscriptionEndDate,
    });
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
}));
const verifyPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentIntentId, email, name, password } = req.body;
    const exists = yield model_users_1.User.isUserExistsByEmail(email);
    if (exists) {
        res.status(400).json({ message: "Email already registered" });
        return;
    }
    const paymentIntent = yield service_payment_1.PaymentService.verifyPayment(paymentIntentId);
    if (paymentIntent.status !== "succeeded") {
        res.status(400).json({ message: "Payment not completed" });
        return;
    }
    const { packageType, subscriptionType } = paymentIntent.metadata;
    if (subscriptionType !== "one_time") {
        res
            .status(400)
            .json({ message: "Use subscription endpoint for recurring payments" });
        return;
    }
    // calculate subscriptionEndDate
    let subscriptionEndDate = undefined;
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
    const user = yield model_users_1.User.create({
        email,
        name,
        password,
        packageType,
        subscriptionType: "one_time",
        amount: paymentIntent.amount,
        subscriptionStatus: subscriptionEndDate ? "active" : undefined,
        subscriptionEndDate,
    });
    console.log("User created:", user);
    // Send welcome email
    yield (0, sendWelcomeEmail_1.sendWelcomeEmail)({
        to: user.email,
        userName: user.name,
        packageType: user.packageType,
        subscriptionType: user.subscriptionType,
        subscriptionEndDate: user.subscriptionEndDate,
    });
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
}));
const cancelSubscription = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const user = yield model_users_1.User.findById(userId);
    if (!user || !user.subscriptionId) {
        res.status(404).json({ message: "User or subscription not found" });
        return;
    }
    const subscription = yield service_payment_1.PaymentService.cancelSubscription(user.subscriptionId);
    yield model_users_1.User.findByIdAndUpdate(userId, { subscriptionStatus: "canceled" });
    res.json({ message: "Subscription canceled successfully", subscription });
}));
exports.PaymentController = {
    startCheckout,
    startSubscriptionCheckout,
    completeSubscriptionRegistration,
    verifyPayment,
    cancelSubscription,
};
