import mongoose, { Model } from "mongoose";
import { SchemaRole } from "./role-type";

export type UserDoc = {
  _id: mongoose.Types.ObjectId;
  name: string;
  username: string;
  password: string;
  salt: string;
  email: string;
  verified: boolean;
  roles: SchemaRole;
  birthday?: Date;
  phoneNumber?: number;
  userAvatar?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: number;
  addResetPasswordFields: () => string;
  resetPassword: (newPassword: string) => UserDoc;
};

export type refreshTokenQueryOptions = {
  isReset?: boolean;
  isAdd?: boolean;
  isReplace?: boolean;
  newRefreshToken?: string;
};

interface UserModelI extends Model<UserDoc> {
  findAndVerifyPassword(
    email: string,
    password: string
  ): Promise<UserDoc | undefined>;

  findAndUpdateRefreshTokens(
    id: mongoose.Types.ObjectId,
    options: refreshTokenQueryOptions,
    refreshToken?: string | undefined
  ): Promise<boolean>;
}

export default UserModelI;
