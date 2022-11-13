// main
import crypto from "crypto";
import mongoose, { Schema } from "mongoose";

// models
import { ContactsModel } from "./Contact.models";

// configs
import ROLES from "../../configs/roles.configs";

// utils
import ExpressError from "../../utils/main/ExpressError.utils";
import {
  hashPassword,
  HashPasswordResult,
  hashResetPasswordTokenString,
  verifyPassword
} from "../../utils/main/passwordUtils.utils";

// interfaces
import { CustomUserModel, UserDoc } from "../../interfaces/user.interfaces";

// types
import { CreateUserReturnedData } from "../../types/user.types";

const UserSchema = new Schema<UserDoc>({
  username: {
    unique: true,
    required: true,
    type: String,
    trim: true,
  },

  email: {
    unique: true,
    required: true,
    type: String,
    trim: true,
  },

  name: {
    required: true,
    type: String,
    trim: true,
  },

  roles: {
    required: true,
    type: [Number],
    default: [ROLES.USER],
    select: false,
  },

  password: {
    unique: true,
    type: String,
    select: false,
    trim: true,
  },

  salt: {
    unique: true,
    type: String,
    select: false,
  },

  phoneNumber: {
    type: Number,
    trim: true,
  },

  birthday: {
    type: Date,
    default: null,
  },

  userImg: {
    type: String,
    default: null,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  resetPasswordToken: {
    type: String,
    select: false,
  },

  resetPasswordExpire: { type: Number, select: false },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.statics.findAndVerifyPassword = async function (
  email: string,
  password: string
): Promise<UserDoc | undefined> {
  try {
    const user: UserDoc = await this.findOne({ email }).select(
      "+password +salt"
    );

    if (!user) throw new ExpressError("invalid email or password");

    const isMatchedPasswords = (await verifyPassword(
      password,
      user.password,
      user.salt
    )) as boolean;

    if (isMatchedPasswords) return user;

    throw new ExpressError("invalid email or password", 400);
  } catch (err: unknown) {
    if (err && err instanceof Error)
      throw new ExpressError(err.message, 400, err.name);
  }
};

UserSchema.statics.isUsernameTaken = async function (
  username: string
): Promise<boolean> {
  const user = await UserModel.exists({ username });

  if (user) return true;

  return false;
};

UserSchema.methods.updateResetPasswordFields = function (
  resetToken: string,
  tokenExpireTime: Date
): void {
  this.resetPasswordToken = resetToken;
  this.resetPasswordExpire = tokenExpireTime;
};

UserSchema.methods.populateResetPasswordFields = function (): string {
  const resetToken: string = crypto.randomBytes(20).toString("hex");

  const hashedResetToken = hashResetPasswordTokenString(resetToken);

  const tokenExpireTime = Date.now() + 10 * 60 * 1000;

  this.updateResetPasswordFields(hashedResetToken, tokenExpireTime);

  return resetToken;
};

UserSchema.methods.updatePassword = function (newPassword: string): UserDoc {
  this.password = newPassword;
  this.updateResetPasswordFields();
  return this as UserDoc;
};

UserSchema.methods.checkUserEmailValidityStatus = function (): boolean {
  return this.verified;
};

UserSchema.methods.markUserAdmin = async function (): Promise<
  boolean | undefined
> {
  try {
    await UserModel.updateOne(
      { _id: this._id },
      { $push: { roles: ROLES.ADMIN } },
      { new: true, runValidators: true }
    );

    return true;
  } catch (err: unknown) {
    if (err && err instanceof Error) throw new Error(err.message);
  }
};

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password") && this.password) {
      const { salt, password } = (await hashPassword(
        this.password
      )) as HashPasswordResult;

      this.salt = salt;

      this.password = password;
    }
    next();
  } catch (err: unknown) {
    if (err && err instanceof Error) {
      next(new ExpressError(err.message, 400, err.name));
    }
  }
});

export const UserModel: CustomUserModel = mongoose.model(
  "User",
  UserSchema
) as CustomUserModel;

// CRUD operations
class User {
  async getUsers() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (err) {
      if (err && err instanceof Error) {
        throw new ExpressError(err.message, 400, err.name);
      }
    }
  }

  async createUser(data: UserDoc): Promise<CreateUserReturnedData | undefined> {
    try {
      const user = await UserModel.create(data);

      const dataToSend: CreateUserReturnedData = {
        _id: user._id,
        username: user.username,
        name: user.name,
        userImg: user.userImg,
        email: user.email,
        phoneNumber: user.phoneNumber,
        birthday: user.birthday,
        verified: user.verified,
        createdAt: user.createdAt,
      };

      return dataToSend;
    } catch (err: unknown) {
      if (err && err instanceof (ExpressError || Error)) {
        throw new ExpressError(err.message, 400, err.name);
      }
    }
  }

  async getUser(
    id: string
  ): Promise<CreateUserReturnedData | null | undefined> {
    try {
      const foundUser: CreateUserReturnedData | null = await UserModel.findById(
        id
      );
      return foundUser;
    } catch (err: unknown) {
      if (err && err instanceof (ExpressError || Error)) {
        throw new ExpressError(err.message, 400, err.name);
      }
    }
  }

  async deleteUser(id: string): Promise<string | undefined | null> {
    try {
      const user: UserDoc | null = await UserModel.findByIdAndDelete(id);

      await ContactsModel.deleteMany({ userID: user?._id });

      return user?._id;
    } catch (err: unknown) {
      if (err && err instanceof (ExpressError || Error)) {
        throw new ExpressError(err.message, 400, err.name);
      }
    }
  }
}

export default User;
