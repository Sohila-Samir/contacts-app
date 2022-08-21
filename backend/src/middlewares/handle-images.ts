import fs from "fs";
import path from "path";
import { NextFunction, Request, Response } from "express";
import ExpressError from "../utils/ExpressError";
import resizeImg from "../utils/resizeImage";
import { SharpOptions } from "../Types/sharp-types";

const handleImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		if (!req.file) return next();

		const storeImgName: string = req.file.fieldname;

		const uniqueSuffix: number = Date.now();

		const imgRelativePath: string = `/${uniqueSuffix}.${req.file?.originalname}`;

		const uploadDirPath: string = path.join(__dirname, "..", "uploads", storeImgName);

		const sharpOptions = {
			imageBuffer: req.file?.buffer,
			imageWidth: 250,
			imageHeight: 250,
			format: "png",
			saveImageDir: uploadDirPath + imgRelativePath,
		};

		fs.mkdir(uploadDirPath, { recursive: true }, async (err: unknown) => {
			err && err instanceof Error
				? new ExpressError(err.message, 500, err.name)
				: await resizeImg(sharpOptions as SharpOptions);

			req.body[storeImgName] = `/${storeImgName}${imgRelativePath}`;
			next();
		});
	} catch (err: unknown) {
		err && err instanceof (ExpressError || Error)
			? next(new ExpressError(err.message, err.status, err.name))
			: "";
	}
};
export default handleImage;
