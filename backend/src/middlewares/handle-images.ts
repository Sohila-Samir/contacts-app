import fs from 'fs';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import ExpressError from '../utils/ExpressError';
import resizeImg from '../utils/resizeImage';
import { SharpOptions } from '../utils/resizeImage';

const handleImage = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		if (req.file) {
			const uniqueSuffix: number = Date.now();
			const imgStorageName: string = `/${uniqueSuffix}.${req.file?.originalname}`;
			const uploadDirPath: string = path.join(
				__dirname,
				'..',
				'uploads',
				'avatar'
			);

			const sharpOptions = {
				imageBuffer: req.file?.buffer,
				imageWidth: 250,
				imageHeight: 250,
				format: 'png',
				saveImageDir: uploadDirPath + imgStorageName,
			};

			fs.mkdir(
				uploadDirPath,
				{ recursive: true },
				async (err: unknown) => {
					err && err instanceof Error
						? new ExpressError(err.message, 500, err.name)
						: await resizeImg(sharpOptions as SharpOptions);
				}
			);
			req.body.imgURL = `/avatar${imgStorageName}`;
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
export default handleImage;
