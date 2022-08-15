import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import { ContactsModel } from '../models/Contact';

const removeImage = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		const contact = await ContactsModel.findById(id);
		if (
			!(req.body && !req.file && contact && !contact.imgURL) ||
			!(!req.body && contact && !contact.imgURL)
		) {
			const contactAvatarImgPath: string = path.join(
				__dirname,
				'..',
				'uploads',
				contact?.imgURL as string
			);

			fs.unlink(contactAvatarImgPath, (err: unknown) => {
				next();
			});
		} else {
			next();
		}
	} catch (err: unknown) {
		err && err instanceof Error ? next(err) : '';
	}
};

export default removeImage;
