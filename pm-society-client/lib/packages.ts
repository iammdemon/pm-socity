// Define specific, more granular types for type safety
interface OneTimePackageConfig {
  type: "one-time";
  price: number; // Amount in cents
  priceId: string; // The Stripe Price ID for the one-time payment
  description: string;
  trialDays: number; // How many days of membership access it grants
}

interface SubscriptionPackageConfig {
  type: "subscription";
  priceIds: {
    monthly: string;
    annual: string;
  };
  description: string;
}

// Create a union type for all possible packages
export type PackageConfig = OneTimePackageConfig | SubscriptionPackageConfig;
export type PackageId = keyof typeof packages;
export type BillingCycle = 'monthly' | 'annual';

// This is the single source of truth for your products.
// Go to Stripe Dashboard -> Products and create these prices.
export const packages = {
  IGNITE: {
    type: "one-time",
    price: 99900, // $999
    priceId: "price_IGNITE_ONE_TIME_ID", // <-- Replace with your Stripe Price ID
    description: "IGNITE Package with PM 101, 2 exec coaching, 2m material+portal",
    trialDays: 60,
  },
  ELEVATE: {
    type: "one-time",
    price: 350000, // $3,500
    priceId: "price_ELEVATE_ONE_TIME_ID", // <-- Replace
    description: "ELEVATE with PMP, 3 exec coaching, 2m portal",
    trialDays: 60,
  },
  ASCEND: {
    type: "one-time",
    price: 450000, // $4,500
    priceId: "price_ASCEND_ONE_TIME_ID", // <-- Replace
    description: "ASCEND with PMI-ACP, 5 exec coaching, 5 mentorship, 6m portal",
    trialDays: 180,
  },
  "THE_SOCIETY": {
    type: "subscription",
    priceIds: {
      monthly: "price_1Rij16IAC5sTC0XP0CtmB3mz", // <-- Replace
      annual: "price_1Rij16IAC5sTC0XPMIUcf86k", // <-- Replace
    },
    description: "THE SOCIETY membership with growth matching, library & events",
  },
  "THE_SOCIETY+": {
    type: "subscription",
    priceIds: {
      monthly: "price_1Rij32IAC5sTC0XPXDl2bqQu", // <-- Replace
      annual: "price_1Rij2gIAC5sTC0XPxdE2GGDc", // <-- Replace
    },
    description: "THE SOCIETY+ membership with monthly coaching/mentorship + community",
  },
  "BUILD_YOUR_OWN_PATH": {
    type: "one-time",
    price: 40000, // $400
    priceId: "price_BUILD_YOUR_OWN_PATH_ID", // <-- Replace
    description: "Customized coaching with choice of executive, mentorship, communication, or Agile focus",
    trialDays: 0,
  },
  "ELEVATE_PILOT": {
    type: "one-time",
    price: 55800, // $558
    priceId: "price_ELEVATE_PILOT_ID", // <-- Replace
    description: "Pilot PMP training cohort with PMP application support, coaching & 2m portal",
    trialDays: 60,
  },
} satisfies Record<string, PackageConfig>;