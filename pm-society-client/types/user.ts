
import { Document, Model, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string; // Hashed
  avatar?: string;
  bio?: string;
  phoneNumber?: string;
  linkedUsers: Types.ObjectId[]; // Array of User IDs
  role: 'member' | 'admin';

  // --- Stripe Integration ---
  stripeCustomerId?: string; // Crucial for linking to Stripe

  // --- Subscription & Access ---
  // This tracks the user's CURRENT access level, which can change over time.
  currentSubscription: {
    status: 'trialing' | 'active' | 'canceled' | 'past_due' | 'unpaid' | null;
    stripeSubscriptionId?: string; // From Stripe
    priceId?: string; // The Stripe Price ID they are on (e.g., monthly or yearly society)
    subscriptionEndDate?: Date; // When their current access expires
  };

  // --- Purchase History ---
  // This is a log of all their purchases, both one-time and subscriptions.
  purchaseHistory: {
    packageType: 'IGNITE' | 'ELEVATE' | 'ASCEND' | 'THE_SOCIETY' | 'THE_SOCIETY_PLUS' | 'BUILD_YOUR_OWN_PATH';
    purchaseDate: Date;
    stripeCheckoutSessionId: string; // For record-keeping
    amount: number; // In cents, e.g., 99900 for $999
  }[];

  createdAt: Date;
  updatedAt: Date;
}

// THIS IS THE CORRECTED INTERFACE
export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}