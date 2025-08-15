import IUser from "./interface.users";
import { User } from "./model.users";

const createUserIntoDB = async (payload: IUser) => {
  return await User.create(payload);
};

const getAllUsers = async () => {

  const result = await User.find()
  return result
};

const findByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const userService = {
  createUserIntoDB,
  getAllUsers,
  findByEmail
};
