import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { UserType } from './../models/User';

const generateAccessToken = (
	payload: Omit<UserType, 'refreshTokens' | 'salt' | 'password'>
): string | Error | undefined => {
	try {
		const privateKey = fs.readFileSync(
			path.join(__dirname, '/PRV_KEY.PEM'),
			'utf-8'
		);

		return jwt.sign(payload, privateKey, {
			expiresIn: '5m',
			issuer: 'http://localhost:2022',
			audience: 'http://localhost:3000',
			algorithm: 'RS256',
		});
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			return err;
		}
	}
};
export default generateAccessToken;
