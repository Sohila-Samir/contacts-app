// main
import { Model } from "mongoose";

// types
import { SchemaRole } from "../types/roles.types";

export interface UserDoc extends UserModelInstanceMethods {
  _id: string;
  name: string;
  username: string;
  password: string;
  salt: string;
  email: string;
  verified: boolean;
  roles: SchemaRole;
  createdAt: Date;
  birthday?: Date;
  userImg?: string;
  resetPasswordToken?: string;
  phoneNumber?: number;
  resetPasswordExpire?: number;
}

interface UserModelInstanceMethods {
  /**
   * @desc changes the `password` field on the user document to the provided string. and rests the `resetPasswordExpire` and `resetPasswordToken` fields to `undefined`.
   * @return the updated user document to save in database later.
   */
  updatePassword: (newPassword: string) => UserDoc;

  /**
   * @return boolean of true if successfully updated user to be an admin user.
   */
  markUserAdmin: () => Promise<boolean | undefined>;

  /**
   * @desc changes the user reset password fields to the given inputs and if nothing is provided it will resets the fields to `undefined`.
   */
  updateResetPasswordFields: (
    resetToken?: string,
    tokenExpireTime?: number
  ) => void;

  /**
   * @desc populate the `resetPasswordToken` and `resetPasswordExpire` fields on the user document to a hash and certain expire time.
   * @return a 20 byte random string.
   */
  populateResetPasswordFields: () => string;

  /**
   * @return returns the current user email verification status as a boolean.
   */
  checkUserEmailValidityStatus: () => boolean;
}

export interface CustomUserModel extends Model<UserDoc> {
  /**
   * @desc search for a user with provided email and validate its password if user was found in database.
   * @return user if found.
   * @throws throws an error if email or password is incorrect.
   */
  findAndVerifyPassword(
    email: string,
    password: string
  ): Promise<UserDoc | undefined>;

  isUsernameTaken(username: string): Promise<boolean>;
}
