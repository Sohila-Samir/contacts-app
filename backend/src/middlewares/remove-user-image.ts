import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/User";
import ExpressError from "../utils/ExpressError";

const removeImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { id } = req.params;
		const user = await UserModel.findById(id);
		if (
			!(req.body && !req.file && user && !user.userAvatar) ||
			!(!req.body && user && !user.userAvatar)
		) {
			const userAvatarImgPath: string = path.join(
				__dirname,
				"..",
				"uploads",
				user?.userAvatar as string
			);

			fs.unlink(userAvatarImgPath, (err: unknown) => {
				if (err && err instanceof Error) throw new ExpressError(err.message, 400, err.name);
				next();
			});
		} else {
			next();
		}
	} catch (err: unknown) {
		err && err instanceof (ExpressError || Error) ? next(err) : "";
	}
};

export default removeImage;
