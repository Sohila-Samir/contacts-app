import { Model } from "mongoose";
import mongoose from "mongoose";
import { SchemaRole } from "./role-type";

export type UserType = {
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
};

export type refreshTokenQueryOptions = {
	isReset?: boolean;
	isAdd?: boolean;
	isReplace?: boolean;
	newRefreshToken?: string;
};

interface UserModelI extends Model<UserType> {
	findAndVerifyPassword(email: string, password: string): Promise<UserType | undefined>;

	findAndUpdateRefreshTokens(
		id: mongoose.Types.ObjectId,
		options: refreshTokenQueryOptions,
		refreshToken?: string | undefined
	): Promise<boolean>;
}

export default UserModelI;
