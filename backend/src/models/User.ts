import mongoose, { Schema } from "mongoose";
import redisClient from "../config/redis";

import ROLES from "../config/roles";
import { ContactsModel } from "./Contact";
import { verifyPassword, hashPassword } from "../utils/main/passwordUtils";
import ExpressError from "../utils/main/ExpressError";

import { UserType, refreshTokenQueryOptions } from "../Types/user-types";
import UserModelI from "./../Types/user-types";

const UserSchema = new Schema({
	username: {
		unique: true,
		required: true,
		type: String,
		trim: true,
	},

	password: {
		unique: true,
		required: true,
		type: String,
		select: false,
		trim: true,
	},

	salt: {
		unique: true,
		required: true,
		type: String,
		select: false,
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
	},

	phoneNumber: {
		type: Number,
		trim: true,
	},

	birthday: {
		type: Date,
		default: null,
	},

	userAvatar: {
		type: String,
		default: null,
	},
	verified: {
		type: Boolean,
		default: false,
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

UserSchema.statics.findAndUpdateRefreshTokens = async function (
	id: string,
	options: refreshTokenQueryOptions = {
		isAdd: false,
		isReset: false,
		isReplace: false,
		newRefreshToken: "",
	},
	refreshToken?
): Promise<boolean | undefined> {
	try {
		const user = await UserModel.findById(id);
		const userRefreshTokens = await redisClient.LRANGE(`RTs_${id}`, 0, -1);

		if (!user) throw new ExpressError("user not found!", 400);

		if (!userRefreshTokens.includes(refreshToken) && options.isReplace) {
			await redisClient.DEL(`RTs_${id}`);
			throw new ExpressError("unauthorized token!", 403);
		}

		if (options.isAdd) {
			await redisClient.LPUSH(`RTs_${id}`, refreshToken);
		}

		if (options.isReplace) {
			await redisClient.LREM(`RTs_${id}`, 0, refreshToken);
			await redisClient.LPUSH(`RTs_${id}`, options.newRefreshToken as any);
		}

		if (options.isReset) {
			await redisClient.DEL(`RTs_${id}`);
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
			throw new ExpressError(err.message, 400, err.name);
		}
	}
});

export const UserModel: UserModelI = mongoose.model("User", UserSchema) as UserModelI;

// CRUD operations
class User {
	async checkUserExistence(username: string) {
		try {
			const isUser = await UserModel.findOne({ username });
			if (isUser) return true;
			return false;
		} catch (err) {
			if (err && err instanceof Error) throw new ExpressError(err.message, 400, err.name);
		}
	}

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

	async createUser(data: UserType): Promise<UserType | Error | undefined | unknown> {
		try {
			const user = await UserModel.create(data);
			return {
				_id: user._id,
				username: user.username,
				name: user.name,
				userAvatar: user.userAvatar,
				email: user.email,
				phoneNumber: user.phoneNumber,
				birthday: user.birthday,
			};
		} catch (err: unknown) {
			if (err && err instanceof (ExpressError || Error)) {
				throw new ExpressError(err.message, 400, err.name);
			}
		}
	}

	async getUser(id: string): Promise<UserType | Error | undefined> {
		try {
			const foundUser = (await UserModel.findById(id)) as UserType;

			return foundUser;
		} catch (err: unknown) {
			if (err && err instanceof (ExpressError || Error)) {
				throw new ExpressError(err.message, 400, err.name);
			}
		}
	}

	async deleteUser(id: string): Promise<mongoose.Types.ObjectId | Error | undefined | null> {
		try {
			const user: UserType | null = await UserModel.findByIdAndDelete(id).select([
				"-password",
				"-salt",
			]);

			await ContactsModel.deleteMany({ userID: id });

			return user?._id;
		} catch (err: unknown) {
			if (err && err instanceof (ExpressError || Error)) {
				throw new ExpressError(err.message, 400, err.name);
			}
		}
	}
}

export default User;
