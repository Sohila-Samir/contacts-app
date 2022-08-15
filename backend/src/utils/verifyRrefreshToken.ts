import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';

import ExpressError from './ExpressError';

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
