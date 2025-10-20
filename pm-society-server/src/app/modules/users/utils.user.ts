import { User } from "./model.users";

const DEFAULT_PASSWORD = "NewDefault123";

// Generate a random string of given length
const randomString = (length: number) => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// ✅ Generate a unique username from email (only if needed)
export const generateUsernameFromEmail = async (email: string) => {
  // 1️⃣ Check if the user already exists with that email
  const existingUser = await User.findOne({ email });

  if (existingUser && existingUser.userName) {
    // Already has username — don’t regenerate
    return existingUser.userName;
  }

  // 2️⃣ Otherwise, generate a new unique username
  const base = email.split("@")[0].toLowerCase(); // use part before @
  let username = base + randomString(4); // add random 4 chars
  let exists = await User.exists({ username });

  while (exists) {
    username = base + randomString(4);
    exists = await User.exists({ username });
  }

  return username;
};

// ✅ Reset all passwords without changing usernames
export const resetAllPasswords = async () => {
  const users = await User.find();
  for (const user of users) {
    // Only reset password, keep username unchanged
    user.password = DEFAULT_PASSWORD; // raw password, pre('save') will hash it
    await user.save();
  }
};
