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
exports.PaymentService = exports.PACKAGE_PRICES = void 0;
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const stripe = new stripe_1.default(config_1.default.STRIPE_SECRET_KEY);
function isOneTimePackage(pkg) {
    return pkg.type === "one_time";
}
exports.PACKAGE_PRICES = {
    IGNITE: { amount: 99900, type: "one_time" },
    ELEVATE: { amount: 250000, type: "one_time" },
    ASCEND: { amount: 350000, type: "one_time" },
    THE_SOCIETY: {
        monthly: { amount: 3900, type: "recurring", priceId: "price_1Rij16IAC5sTC0XP0CtmB3mz" },
        yearly: { amount: 39900, type: "recurring", priceId: "price_1Rij16IAC5sTC0XPMIUcf86k" }
    },
    THE_SOCIETY_PLUS: {
        monthly: { amount: 9900, type: "recurring", priceId: "price_1Rij32IAC5sTC0XPXDl2bqQu" },
        yearly: { amount: 99900, type: "recurring", priceId: "price_1Rij2gIAC5sTC0XPxdE2GGDc" }
    }
};
const createPaymentIntent = (packageType, subscriptionType) => __awaiter(void 0, void 0, void 0, function* () {
    const pkg = exports.PACKAGE_PRICES[packageType];
    if (!pkg)
        throw new Error(`Invalid package type: ${packageType}`);
    let amount = 0;
    if (isOneTimePackage(pkg))
        amount = pkg.amount;
    else {
        if (!subscriptionType)
            throw new Error(`Subscription type is required`);
        amount = pkg[subscriptionType].amount;
    }
    return yield stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method_types: ["card"],
        metadata: {
            packageType,
            subscriptionType: subscriptionType || "one_time"
        }
    });
});
const createCustomer = (email, name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield stripe.customers.create({ email, name });
});
const createSubscription = (customerId, packageType, subscriptionType) => __awaiter(void 0, void 0, void 0, function* () {
    const pkg = exports.PACKAGE_PRICES[packageType];
    if (!pkg || isOneTimePackage(pkg)) {
        throw new Error("Invalid recurring package");
    }
    if (!["monthly", "yearly"].includes(subscriptionType)) {
        throw new Error(`Invalid subscription type: ${subscriptionType}`);
    }
    const priceId = pkg[subscriptionType].priceId;
    console.log("Creating subscription for", customerId, "with priceId:", priceId);
    const subscription = yield stripe.subscriptions.create({
        customer: customerId,
        items: [{
                price: priceId,
            }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.confirmation_secret'],
    });
    return subscription;
});
const getSubscription = (subscriptionId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield stripe.subscriptions.retrieve(subscriptionId, {
        expand: ['items.data.price', 'latest_invoice.payment_intent']
    });
});
const getCustomer = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield stripe.customers.retrieve(customerId);
});
const verifyPayment = (paymentIntentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield stripe.paymentIntents.retrieve(paymentIntentId);
});
const cancelSubscription = (subscriptionId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true
    });
});
exports.PaymentService = {
    createPaymentIntent,
    createCustomer,
    createSubscription,
    getSubscription,
    getCustomer,
    verifyPayment,
    cancelSubscription
};
