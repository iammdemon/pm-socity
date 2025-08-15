import { Model } from "mongoose";

export default interface IUser {
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    course?: string;
    amount?: number;
    role?: "member" | "admin";
    packageType?: "IGNITE" | "ELEVATE" | "ASCEND" | "THE_SOCIETY" | "THE_SOCIETY_PLUS";
    subscriptionType?: "monthly" | "yearly" | "one_time";
    subscriptionId?: string; // Stripe subscription ID
    subscriptionStatus?: "active" | "canceled" | "past_due" | "unpaid";
    subscriptionEndDate?: Date;
    passwordChangedAt?: Date;
    createdAt?: Date;
}

export interface UserModel extends Model<IUser> {
    isUserExistsByEmail(email: string): Promise<IUser | null>;
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(passwordChangedTimestamp: Date, jwtIssuedTimestamp: number): boolean;
}


