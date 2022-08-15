import mongoose from 'mongoose';

export type UserType = {
	_id?: mongoose.Types.ObjectId;
	username: string;
	password: string;
	salt: string;
	email: string;
	admin: boolean;
	refreshTokens: string[];
};
