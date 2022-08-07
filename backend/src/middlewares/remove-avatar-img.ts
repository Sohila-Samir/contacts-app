import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import ExpressError from '../utils/ExpressError';
import { ContactsModel } from '../models/Contact';

const removeContactAvatarImg = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		if (
			(Object.values(req.body).length && req.file) ||
			(!Object.values(req.body).length && !req.file)
		) {
			const { id } = req.params;
			const contact = await ContactsModel.findById(id);

			const contactAvatarImgPath: string = path.join(
				__dirname,
				'..',
				'uploads',
				contact?.avatarURL as string
			);

			fs.unlink(contactAvatarImgPath, (err: unknown) => {
				if (err && err instanceof Error) {
					return next(new ExpressError(err.message, 400, err.name));
				}
			});
		}
		next();
	} catch (err: unknown) {
		err && err instanceof Error ? next(err) : '';
	}
};

export default removeContactAvatarImg;
