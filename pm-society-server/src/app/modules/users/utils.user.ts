import { User } from "./model.users";


// Generate a random string of given length
const randomString = (length: number) => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Generate a unique username from email
export const generateUsernameFromEmail = async (email: string) => {
  const base = email.split("@")[0].toLowerCase(); // use part before @
  let username = base + randomString(4); // add random 4 chars
  let exists = await User.exists({ username });

  // Keep generating until unique
  while (exists) {
    username = base + randomString(4);
    exists = await User.exists({ username });
  }

  return username;
};
