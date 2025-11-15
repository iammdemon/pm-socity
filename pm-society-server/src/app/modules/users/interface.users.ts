import { Model, Types } from "mongoose";

export default interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  userName: string;
  title: string;
  phoneNumber?: string;
  course?: string;
  amount?: number;
  role?: "member" | "admin";
  packageType?:
    | "IGNITE"
    | "ELEVATE"
    | "ASCEND"
    | "THE_SOCIETY"
    | "THE_SOCIETY_PLUS"
    | "BUILD_YOUR_OWN_PATH"
    | "ELEVATE_PILOT";
  subscriptionType?: "monthly" | "yearly" | "one_time";
  subscriptionId?: string; // Stripe subscription ID
  subscriptionStatus?: "active" | "canceled" | "past_due" | "unpaid";
  subscriptionEndDate?: Date;
  passwordChangedAt?: Date;
  createdAt?: Date;
  bio?: string;
  avatar?: string;
  linkedinSupport: "active" | "inactive"
  cohort?:Types.ObjectId;
  linkedUsers?: Types.ObjectId[];
  updatedAt?: Date;
}




export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
