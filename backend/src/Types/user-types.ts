import { Model } from "mongoose";
import mongoose from "mongoose";

export type UserType = {
	_id: mongoose.Types.ObjectId;
	refreshTokens: string[];
	name: string;
	username: string;
	password: string;
	salt: string;
	email: string;
	admin: boolean;
	birthday?: Date;
	phoneNumber?: number;
	userAvatar?: string;
};

export type refreshTokenQueryOptions = {
	isAdd?: boolean;
	isRemove?: boolean;
	isReplace?: boolean;
	isEmpty?: boolean;
	newToken?: string;
};

interface UserModelI extends Model<UserType> {
	findAndVerifyPassword(email: string, password: string): Promise<UserType | undefined>;

	findAndUpdateRefreshToken(
		id: mongoose.Types.ObjectId,
		refreshToken: string | undefined,
		options: refreshTokenQueryOptions
	): Promise<boolean>;
}

export default UserModelI;
