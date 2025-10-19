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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
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
    linkedUsers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
UserSchema.virtual("linkedUsersCount").get(function () {
    var _a;
    return ((_a = this.linkedUsers) === null || _a === void 0 ? void 0 : _a.length) || 0;
});
// hash the password before saving
// This middleware will run before saving a user document
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // Hash the password before saving
        user.password = yield bcrypt_1.default.hash(user.password, Number(process.env.BCRYPT_SALT_ROUNDS));
        next();
    });
});
// set '' after saving password
UserSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});
// find user by email
UserSchema.statics.isUserExistsByEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return exports.User.findOne({ email }).select("+password");
    });
};
// compare password
UserSchema.statics.isPasswordMatched = function (plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    });
};
UserSchema.statics.isJWTIssuedBeforePasswordChanged = function (passwordChangedTimestamp, jwtIssuedTimestamp) {
    const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};
exports.User = (0, mongoose_1.model)("User", UserSchema);
