import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { ContactsModel } from "../models/Contact";
import ExpressError from "../utils/ExpressError";

const removeImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { id } = req.params;
		const contact = await ContactsModel.findById(id);
		if (
			!(req.body && !req.file && contact && !contact.contactAvatar) ||
			!(!req.body && contact && !contact.contactAvatar)
		) {
			const contactAvatarImgPath: string = path.join(
				__dirname,
				"..",
				"uploads",
				contact?.contactAvatar as string
			);

			fs.unlink(contactAvatarImgPath, (err: unknown) => {
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
