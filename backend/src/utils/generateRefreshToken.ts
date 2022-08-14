import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { UserType } from './../models/User';

const generateRefreshToken = (
	user: Omit<UserType, 'password' | 'salt' | 'refreshTokens'>
): string | Error | undefined => {
	try {
		const privateRefreshKey = fs.readFileSync(
			path.join(__dirname, '/PRV_KEY_REFRESH.PEM')
		);

		console.log(privateRefreshKey);

		return jwt.sign(user, privateRefreshKey, {
			issuer: 'http://localhost:2022',
			audience: 'http://localhost:3000',
		});
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			return err;
		}
	}
};

export default generateRefreshToken;
