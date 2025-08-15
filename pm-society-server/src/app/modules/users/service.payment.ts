import Stripe from "stripe";
import config from "../../config";

const stripe = new Stripe(config.STRIPE_SECRET_KEY as string);

type OneTimePackage = { amount: number; type: "one_time" };

type RecurringPackage = {
  monthly: { amount: number; type: "recurring"; priceId: string };
  yearly: { amount: number; type: "recurring"; priceId: string };
};

type PackageConfig = OneTimePackage | RecurringPackage;

function isOneTimePackage(pkg: PackageConfig): pkg is OneTimePackage {
  return (pkg as OneTimePackage).type === "one_time";
}

export const PACKAGE_PRICES: Record<string, PackageConfig> = {
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

const createPaymentIntent = async (packageType: string, subscriptionType?: string) => {
  const pkg = PACKAGE_PRICES[packageType as keyof typeof PACKAGE_PRICES];
  if (!pkg) throw new Error(`Invalid package type: ${packageType}`);

  let amount = 0;
  if (isOneTimePackage(pkg)) amount = (pkg as any).amount;
  else {
    if (!subscriptionType) throw new Error(`Subscription type is required`);
    amount = (pkg as any)[subscriptionType].amount;
  }

  return await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    payment_method_types: ["card"],
    metadata: {
      packageType,
      subscriptionType: subscriptionType || "one_time"
    }
  });
};

const createCustomer = async (email: string, name: string) => {
  return await stripe.customers.create({ email, name });
};

const createSubscription = async (
  customerId: string,
  packageType: keyof typeof PACKAGE_PRICES,
  subscriptionType: "monthly" | "yearly"
) => {
  const pkg = PACKAGE_PRICES[packageType];
  if (!pkg || isOneTimePackage(pkg)) {
    throw new Error("Invalid recurring package");
  }

  if (!["monthly", "yearly"].includes(subscriptionType)) {
    throw new Error(`Invalid subscription type: ${subscriptionType}`);
  }

  const priceId = pkg[subscriptionType].priceId;
  console.log("Creating subscription for", customerId, "with priceId:", priceId);



  const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{
        price: priceId,
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.confirmation_secret'],
    });

  return subscription;
};

const getSubscription = async (subscriptionId: string) => {
  return await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['items.data.price', 'latest_invoice.payment_intent']
  });
};

const getCustomer = async (customerId: string) => {
  return await stripe.customers.retrieve(customerId) as Stripe.Customer;
};

const verifyPayment = async (paymentIntentId: string) => {
  return await stripe.paymentIntents.retrieve(paymentIntentId);
};

const cancelSubscription = async (subscriptionId: string) => {
  return await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true
  });
};

export const PaymentService = {
  createPaymentIntent,
  createCustomer,
  createSubscription,
  getSubscription,
  getCustomer,
  verifyPayment,
  cancelSubscription
};