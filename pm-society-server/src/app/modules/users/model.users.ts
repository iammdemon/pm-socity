import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import IUser, { UserModel } from "./interface.users";

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phoneNumber: String,
    course: String,
    amount: Number,
    role: { type: String, enum: ["member", "admin"], default: "member" },
    packageType: {
      type: String,
      enum: ["IGNITE", "ELEVATE", "ASCEND", "THE_SOCIETY", "THE_SOCIETY_PLUS"]
    },
    subscriptionType: {
      type: String,
      enum: ["monthly", "yearly", "one_time"]
    },
    subscriptionId: String,
    subscriptionStatus: {
      type: String,
      enum: ["active", "canceled", "past_due", "unpaid"]
    },
    subscriptionEndDate: Date
  },
  { timestamps: true }
);

// hash the password before saving
// This middleware will run before saving a user document
UserSchema.pre("save", async function (next) {
  const user = this as IUser;
  // Hash the password before saving
  user.password = await bcrypt.hash(
    user.password,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  );
  next();
});

// set '' after saving password
UserSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// find user by email
UserSchema.statics.isUserExistsByEmail = async function (email: string) {
  return User.findOne({ email }).select("+password");
};

// compare password
UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};


UserSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = mongoose.model<IUser, UserModel>("User", UserSchema);
