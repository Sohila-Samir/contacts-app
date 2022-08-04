import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import ExpressError from '../utils/ExpressError';

const removeContactAvatarImg = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const contactAvatarImgPath: string = path.join(
		__dirname,
		'..',
		'uploads',
		res.locals.deletedContact.avatarURL
	);

	fs.unlink(contactAvatarImgPath, (err: unknown) => {
		if (err && err instanceof Error) {
			return next(new ExpressError(err.message, 400, err.name));
		}
		res.status(200).json(res.locals.deletedContact);
	});
};

export default removeContactAvatarImg;
