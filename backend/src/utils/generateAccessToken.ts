import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { UserType } from './../models/User';

const generateAccessToken = (
	user: Omit<UserType, 'refreshTokens' | 'salt' | 'password'>
): string | Error | undefined => {
	try {
		const privateKey = fs.readFileSync(path.join(__dirname, '/PRV_KEY.PEM'));
		console.log(privateKey);
		return jwt.sign(user, privateKey, {
			expiresIn: '15m',
			issuer: 'http://localhost:2022',
			audience: 'http://localhost:3000',
		});
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			return err;
		}
	}
};
export default generateAccessToken;
