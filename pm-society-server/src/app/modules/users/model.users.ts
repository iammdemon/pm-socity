import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import IUser, { UserModel } from "./interface.users";

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userName: { type: String, unique: true },
    title: { type: String },
    phoneNumber: { type: String },
    course: { type: String },
    amount: { type: Number },
    role: { type: String, enum: ["member", "admin"], default: "member" },
    packageType: {
      type: String,
      enum: [
        "IGNITE",
        "ELEVATE",
        "ASCEND",
        "THE_SOCIETY",
        "THE_SOCIETY_PLUS",
        "BUILD_YOUR_OWN_PATH",
        "ELEVATE_PILOT",
      ],
    },
    subscriptionType: {
      type: String,
      enum: ["monthly", "yearly", "one_time"],
    },
    subscriptionId: String,
    subscriptionStatus: {
      type: String,
      enum: ["active", "canceled", "past_due", "unpaid"],
    },
    subscriptionEndDate: Date,
    bio: String,
    avatar: String,
    linkedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

UserSchema.virtual("linkedUsersCount").get(function () {
  return this.linkedUsers?.length || 0;
});

// hash the password before saving
// This middleware will run before saving a user document
UserSchema.pre("save", async function (next) {
  const user = this as IUser;

  //  Only hash if the password was changed
  if (this.isModified("password")) {
    user.password = await bcrypt.hash(
      user.password,
      Number(process.env.BCRYPT_SALT_ROUNDS)
    );
  }

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
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<IUser, UserModel>("User", UserSchema);
