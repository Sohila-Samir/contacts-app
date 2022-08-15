import mongoose from 'mongoose';

export type PayloadType = {
	_id: mongoose.Types.ObjectId | undefined;
	admin: boolean;
	email: string;
	username: string;
};

export type UserAuthData = {
	user?: PayloadType;
	accessToken: string;
	refreshToken: string;
};
