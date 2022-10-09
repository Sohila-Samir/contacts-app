import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { ContactsModel } from "../../models/Contact";
import { ContactType } from "../../Types/contact-types";
import ExpressError from "../../utils/main/ExpressError";

/*
	CASES TO REMOVE IMAGE
	- updating contact with a previous image and new image - RUN
	- updating contact with a previous image and cleared image from client side - RUN
	+ removing contact with no contact image - RUN

	CASES TO NOT REMOVE IMAGE
	- updating contact with no previous image and no image provided from client side - DON'T RUN
	- updating contact with no previous image and new image - DON'T RUN
	- updating contact with previous image and no new image - DON'T RUN
	+ removing contact with contact image - DON'T RUN
*/
const removeContactImg = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const contact: ContactType | null = await ContactsModel.findById(id);
    const isRequestBodyEmpty: number = Object.values(req.body).length;
    if (
      (isRequestBodyEmpty && req.file && contact && contact.contactAvatar) ||
      (!isRequestBodyEmpty && contact && contact.contactAvatar) ||
      (isRequestBodyEmpty &&
        !req.body.contactAvatar &&
        !req.file &&
        contact &&
        contact.contactAvatar)
    ) {
      const contactAvatarImgPath: string = path.join(
        __dirname,
        "..",
        "uploads",
        contact?.contactAvatar as string
      );

      fs.unlink(contactAvatarImgPath, (err: unknown) => {
        if (err && err instanceof Error)
          console.log("removing contact image error");
        next();
      });
    } else {
      next();
    }
  } catch (err: unknown) {
    if (err && err instanceof (ExpressError || Error)) {
      console.log("error caught", err.message);
      next(err);
    }
  }
};

export default removeContactImg;
