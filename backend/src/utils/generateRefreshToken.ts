import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { UserType } from './../models/User';

const generateRefreshToken = (
	payload: Omit<UserType, 'password' | 'salt' | 'refreshTokens'>
): string | Error | undefined => {
	try {
		const privateRefreshKey = fs.readFileSync(
			path.join(__dirname, '/PRV_KEY_REFRESH.PEM'),
			'utf-8'
		);

		return jwt.sign(payload, privateRefreshKey, {
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

export default generateRefreshToken;
