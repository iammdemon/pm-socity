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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetAllPasswords = exports.generateUsernameFromEmail = void 0;
const model_users_1 = require("./model.users");
const DEFAULT_PASSWORD = "NewDefault123";
// Generate a random string of given length
const randomString = (length) => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};
// ✅ Generate a unique username from email (only if needed)
const generateUsernameFromEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // 1️⃣ Check if the user already exists with that email
    const existingUser = yield model_users_1.User.findOne({ email });
    if (existingUser && existingUser.userName) {
        // Already has username — don’t regenerate
        return existingUser.userName;
    }
    // 2️⃣ Otherwise, generate a new unique username
    const base = email.split("@")[0].toLowerCase(); // use part before @
    let username = base + randomString(4); // add random 4 chars
    let exists = yield model_users_1.User.exists({ username });
    while (exists) {
        username = base + randomString(4);
        exists = yield model_users_1.User.exists({ username });
    }
    return username;
});
exports.generateUsernameFromEmail = generateUsernameFromEmail;
// ✅ Reset all passwords without changing usernames
const resetAllPasswords = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield model_users_1.User.find();
    for (const user of users) {
        // Only reset password, keep username unchanged
        user.password = DEFAULT_PASSWORD; // raw password, pre('save') will hash it
        yield user.save();
    }
});
exports.resetAllPasswords = resetAllPasswords;
