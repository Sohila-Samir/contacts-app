import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import { UserModel } from '../models/User';
import ExpressError from './ExpressError';
import mongoose from 'mongoose';
import generateAccessToken from './generateAccessToken';
import generateRefreshToken from './generateRefreshToken';

type DecodedPayloadType = {
	_id: mongoose.Types.ObjectId;
	admin: boolean;
	username: string;
	email: string;
	iat: number;
	aud: string;
	iss: string;
};

const verifyRefreshToken = (refreshToken: string) => {
	try {
		const publicRefreshKey = fs.readFileSync(
			path.join(__dirname, '/PUB_KEY_REFRESH.pem'),
			'utf-8'
		);

		const isValidRefreshToken = jwt.verify(refreshToken, publicRefreshKey, {
			algorithms: ['RS256'],
		});

		if (typeof isValidRefreshToken !== 'string') return isValidRefreshToken;
		return false;
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			throw new ExpressError(err.message, 400, err.name);
		}
	}
};

export default verifyRefreshToken;
