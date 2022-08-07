import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import ExpressError from '../utils/ExpressError';

const handleContactAvatarImg = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (req.file) {
			const imgWidth: number = 100;
			const imgHeight: number = 100;
			const uniqueSuffix: number = Date.now();
			const uploadDirPath: string = path.join(
				__dirname,
				'..',
				'uploads',
				'avatar'
			);
			const imgStorageName: string = `/${uniqueSuffix}.${req.file?.originalname}`;

			fs.mkdir(uploadDirPath, { recursive: true }, (err: unknown) => {
				err && err instanceof Error
					? new ExpressError(err.message, 500, err.name)
					: sharp(req.file?.buffer)
							.resize(imgWidth, imgHeight)
							.toFormat('png')
							.png({
								force: true,
								quality: 100,
							})
							.toFile(uploadDirPath + imgStorageName)
							.catch(
								(err) =>
									new ExpressError(
										`sharp error | ${err.message}`,
										500,
										err.name
									)
							);
			});
			req.body.avatarURL = `/avatar${imgStorageName}`;
			next();
		} else {
			next();
		}
	} catch (err: unknown) {
		err && err instanceof Error
			? next(new ExpressError(err.message, 500, err.name))
			: '';
	}
};
export default handleContactAvatarImg;
