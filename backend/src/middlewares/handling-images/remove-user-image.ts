import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { UserModel } from "../../models/User";
import ExpressError from "../../utils/main/ExpressError";

const removeUserImg = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
        if (err && err instanceof Error)
          console.log("removing user image error");
        next();
      });
    } else {
      next();
    }
  } catch (err: unknown) {
    err && err instanceof (ExpressError || Error) ? next(err) : "";
  }
};

export default removeUserImg;
