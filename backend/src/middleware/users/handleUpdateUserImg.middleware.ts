import { NextFunction, Request, Response } from "express"
import fs from "fs"
import path from "path"
import { UserDoc } from "../../interfaces/user.interfaces"
import { UserModel } from "../../models/mongoose/User.models"
import { SharpOptions } from "../../types/sharp.types"
import resizeAndSaveImg from "../../utils/images/resizeImage.utils"
import ExpressError from "../../utils/main/ExpressError.utils"

/*
  *CASES WHEN TO DELETE THE CURRENT IMAGE AND CREATE A NEW ONE
  - user provided new image and there is a current image.
  - user has no current image and now is uploading a one. TODO: check this case

  *CASES WHEN TO DELETE CURRENT IMAGE BUT NOT CREATE A NEW ONE:
  - user deleted the userImg field from the client side (wants to remove the current picture).

  *CASES WHEN NOT TO DELETE CURRENT IMAGE NOR CREATE A NEW ONE:
  - user did not upload a new image nor requested deleting the current image.
*/
const handleUpdateUserImg = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.file && req.body.userImg) return next()

  const { id } = req.params

  const user: UserDoc | null = await UserModel.findById(id)

  const userCurrentImgRelPath = user?.userImg as string

  if ((req.file && userCurrentImgRelPath && req.body.userImg)
    || (req.file && !userCurrentImgRelPath && req.body.userImg)) {

    const sharpOptions: SharpOptions = {
      folderName: req.file.fieldname,
      imgName: req.file.originalname,
      imageBuffer: req.file.buffer,
      imageHeight: 250,
      imageWidth: 250,
      format: "jpg",
    }

    const imgRelativePath = resizeAndSaveImg(sharpOptions)

    if (imgRelativePath) {
      res.locals.userImgRelativePath = imgRelativePath
    }
  }

  fs.unlink(path.join(__dirname, "..", "..", "uploads", userCurrentImgRelPath), (err: unknown) => {
    if (err && err instanceof Error) next(new ExpressError(err?.message, 400, (err?.name || "DeleteUserImgError")))
  })
}

export default handleUpdateUserImg
