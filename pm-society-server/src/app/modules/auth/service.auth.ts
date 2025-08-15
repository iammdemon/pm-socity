import config from '../../config';
import { User } from '../users/model.users';
import { IAuth } from './interface.auth';
import { createToken } from './utils.auth';
import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';

const loginUser = async (payload: IAuth) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) throw new Error('User not found');

  const isPasswordValid = await User.isPasswordMatched(payload.password, user.password);
  if (!isPasswordValid) throw new Error('Invalid password');

  const jwtPayload = {
    email: user.email,
    role: user.role as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT_SECRET as string,
    config.JWT_EXPIRES_IN as string
  );

  return { accessToken, userRole: user.role };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.isUserExistsByEmail(userData.email);
  if (!user) throw new Error('User not found');

  const valid = await User.isPasswordMatched(payload.oldPassword, user.password);
  if (!valid) throw new Error('Invalid old password');

  const newHashed = await bcrypt.hash(payload.newPassword, Number(config.BCRYPT_SALT_ROUNDS));

  await User.findOneAndUpdate(
    { email: userData.email },
    { password: newHashed, passwordChangedAt: new Date() }
  );
};

export const authService = { loginUser, changePassword };
