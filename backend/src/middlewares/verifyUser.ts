import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import ExpressError from '../utils/ExpressError';

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
	try {
		const publicKey = fs.readFileSync(path.join(__dirname, '../utils/PUB_KEY'));
		const authHeader = req.headers.authorization;

		if (!authHeader)
			new ExpressError(
				'you are not authenticated, sign in first',
				401,
				undefined
			);
		else {
			const token = authHeader.split(' ')[1];
			const isValid = jwt.verify(token, publicKey);
			isValid ? next() : new ExpressError('token is not valid', 403, undefined);
		}
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			next(err);
		}
	}
};

export default verifyUser;
