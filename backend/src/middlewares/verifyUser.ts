import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import ExpressError from '../utils/ExpressError';

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
	try {
		const publicKey = fs.readFileSync(
			path.join(__dirname, '../utils/PUB_KEY.pem'),
			'utf8'
		);

		const authHeader = req.headers.authorization;

		if (!authHeader)
			throw new ExpressError(
				'you are not authenticated, sign in first',
				401,
				undefined
			);
		else {
			const token = authHeader.split(' ')[1];
			jwt.verify(
				token,
				publicKey,
				{ algorithms: ['RS256'] },
				(err, decoded) => {
					if (err)
						throw new ExpressError(
							'token is not valid or expired',
							403,
							undefined
						);
					next();
				}
			);
		}
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			next(err);
		}
	}
};

export default verifyUser;
