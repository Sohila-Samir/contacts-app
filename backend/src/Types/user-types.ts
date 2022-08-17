import { Model } from 'mongoose';
import { UserModel } from './../models/User';
import mongoose from 'mongoose';

export type UserType = {
	birthday?: Date;
	phoneNumber?: number;
	imgURL?: string;
	_id: mongoose.Types.ObjectId;
	refreshTokens: string[];
	name: string;
	username: string;
	password: string;
	salt: string;
	email: string;
	admin: boolean;
};

export type refreshTokenQueryOptions = {
	isAdd?: boolean;
	isRemove?: boolean;
	isReplace?: boolean;
	isEmpty?: boolean;
	newToken?: string;
};
interface UserModelI extends Model<typeof UserModel> {
	findAndVerifyPassword(
		email: string,
		password: string
	): Promise<UserType | undefined>;
	findAndUpdateRefreshToken(
		id: mongoose.Types.ObjectId,
		refreshToken: string | undefined,
		options: refreshTokenQueryOptions
	): Promise<boolean>;
}

export default UserModelI;
