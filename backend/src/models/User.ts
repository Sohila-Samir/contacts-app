import mongoose, { Schema } from "mongoose";

import ExpressError from "../utils/ExpressError";
import { verifyPassword, hashPassword } from "./../utils/passwordUtils";

import { UserType, refreshTokenQueryOptions } from "../Types/user-types";
import UserModelI from "./../Types/user-types";

const UserSchema = new Schema({
	username: {
		unique: true,
		required: [true, "username is required!"],
		type: String,
		trim: true,
	},

	password: {
		unique: true,
		required: [true, "password is required!"],
		type: String,
		select: false,
		trim: true,
	},
	// "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
	salt: {
		unique: true,
		required: [true, "salt is required!"],
		type: String,
		select: false,
	},

	email: {
		unique: true,
		required: [true, "email is required!"],
		type: String,
		trim: true,
	},

	name: {
		required: [true, "name is required!"],
		type: String,
		trim: true,
	},

	admin: {
		type: Boolean,
		default: false,
	},

	phoneNumber: {
		type: Number,
		trim: true,
	},

	birthday: {
		type: Date,
		default: null,
	},

	refreshTokens: {
		type: [String],
		default: [],
		select: false,
	},

	userAvatar: {
		type: String,
		default: null,
	},
});

// UserSchema static methods
UserSchema.statics.findAndVerifyPassword = async function (
	email: string,
	password: string
): Promise<UserType | undefined> {
	try {
		const user: UserType = await this.findOne({ email }).select("+password +salt");
		if (!user) throw new ExpressError("invalid email or password");

		const isMatchedPasswords = await verifyPassword(password, user.password, user.salt);

		if (isMatchedPasswords) return user;
		throw new ExpressError("invalid email or password", 400);
	} catch (err: unknown) {
		if (err && err instanceof Error) throw new ExpressError(err.message, 400, err.name);
	}
};

UserSchema.statics.findAndUpdateRefreshToken = async function (
	id: string,
	refreshToken: string = "",
	options: refreshTokenQueryOptions = {
		isAdd: false,
		isRemove: false,
		isEmpty: false,
		isReplace: false,
		newToken: "",
	}
): Promise<boolean | undefined> {
	try {
		const user: UserType = await this.findById(id).select("+refreshTokens");

		if (!user) throw new ExpressError("user is not found!");

		if (!user.refreshTokens.includes(refreshToken) && !options.isAdd) {
			await this.updateOne({ email: user.email }, { refreshTokens: [] });
			throw new ExpressError("invalid token, re-use token is dedicated!", 403);
		}

		if (options.isEmpty) {
			await this.updateOne({ email: user.email }, { refreshTokens: [] });
		}

		if (options.isAdd) {
			const newRefreshTokens = user.refreshTokens;
			newRefreshTokens.push(refreshToken as string);

			await this.updateOne({ email: user.email }, { refreshTokens: newRefreshTokens });
		}

		if (options.isRemove) {
			await this.updateOne(
				{ email: user.email },
				{
					refreshTokens: user.refreshTokens.filter((tkn: string) => tkn !== refreshToken),
				}
			);
		}

		if (options.isReplace) {
			const newRefreshTokens = user.refreshTokens.filter((token: string) => token !== refreshToken);
			newRefreshTokens.push(options.newToken as string);

			await this.updateOne({ email: user.email }, { refreshTokens: newRefreshTokens });
		}

		return true;
	} catch (err: unknown) {
		if (err && err instanceof (ExpressError || Error)) {
			throw new ExpressError(err.message, err.status, err.name);
		}
	}
};

// UserSchema middlewares
UserSchema.pre("validate", async function (next) {
	try {
		if (this.isModified("password")) {
			const userVerifyCredentials = await hashPassword(this.password);

			this.salt = userVerifyCredentials?.salt as string;
			this.password = userVerifyCredentials?.password as string;
			next();
		}
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			next(err);
		}
	}
});

export const UserModel: UserModelI = mongoose.model("User", UserSchema) as UserModelI;

// CRUD operations
class User {
	async createUser(data: UserType): Promise<UserType | Error | undefined | unknown> {
		try {
			const user = await UserModel.create(data);
			return {
				username: user.username,
				name: user.name,
				userAvatar: user.userAvatar,
				email: user.email,
				phoneNumber: user.phoneNumber,
				birthday: user.birthday,
				admin: user.admin,
			};
		} catch (err: unknown) {
			if (err && err instanceof (ExpressError || Error)) {
				throw new ExpressError(err.message, 400, err.name);
			}
		}
	}

	async getUser(id: string): Promise<UserType | Error | null | undefined> {
		try {
			const foundUser: UserType | null = await UserModel.findById(id);
			return foundUser;
		} catch (err: unknown) {
			if (err && err instanceof (ExpressError || Error)) {
				throw new ExpressError(err.message, 400, err.name);
			}
		}
	}

	async deleteUser(id: string): Promise<UserType | Error | null | undefined> {
		try {
			const deletedUser: UserType | null = await UserModel.findByIdAndDelete(id).select([
				"-password",
				"-salt",
				"-refreshTokens",
			]);
			return deletedUser;
		} catch (err: unknown) {
			if (err && err instanceof (ExpressError || Error)) {
				throw new ExpressError(err.message, 400, err.name);
			}
		}
	}
}

export default User;
