import mongoose ,{Schema, model, models} from "mongoose";
import bcrypt from "bcrypt"

export  interface IUser {
    name: string;
    email: string;
    _id?: mongoose.Types.ObjectId
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

const userSchema= new Schema<IUser>(
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

userSchema.pre('save', async function(next){
    if(this.isModified("password")){
      this.password =  await bcrypt.hash(this.password, 10)
    }
    next()
})

const User = models?.User || model<IUser>("User", userSchema);

export default User;