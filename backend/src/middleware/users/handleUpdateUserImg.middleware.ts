import { NextFunction, Request, Response } from "express"

import { UserModel } from "../../models/mongoose/User.models"

import { UserDoc } from "../../interfaces/user.interfaces"
import { SharpOptions } from "../../types/sharp.types"

import deleteImage from "../../utils/images/deleteImage.utils"
import resizeAndSaveImg from "../../utils/images/resizeImage.utils"

/*
  *CASES WHEN NOT TO DELETE AND CREATE A NEW IMAGE (add image for the first time)
  - user provided an image and user document has no image field (null).

  *CASES WHEN TO DELETE THE CURRENT IMAGE AND CREATE A NEW ONE
  - user provided new image and there is a current image.

  *CASES WHEN TO DELETE CURRENT IMAGE BUT NOT CREATE A NEW ONE:
  - user deleted the userImg field from the client side (wants to remove the current picture).

  *CASES WHEN NOT TO DELETE CURRENT IMAGE NOR CREATE A NEW ONE:
  - user did not upload a new image nor requested deleting the current image.
  - user is creating a new account and did not provide an image.
*/
const handleUpdateUserImg = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //* BE CAREFUL WITH THE CREATE USER SCENARIO  (THERE IS NO "ID" PARAM ALREADY).

  const { id } = req.params

  const user: UserDoc | null = await UserModel.findById(id)

  const userCurrentImagePath = user?.userImg as string

  // handle CASES WHEN NOT TO DELETE CURRENT IMAGE NOR CREATE A NEW ONE.
  if ((!req.file && !req.body.userImg) || (!req.file && req.body.userImg.toString() === userCurrentImagePath?.toString())) return next()

  // handle CASES WHEN TO DELETE THE CURRENT IMAGE.
  if (userCurrentImagePath && (req.file && req.body.userImg) || (!req.file && !req.body.userImg)) {
    deleteImage(userCurrentImagePath)
  }

  // handle CASES WHEN TO CREATE NEW IMAGE.
  if (req.file && req.body.userImg && (!userCurrentImagePath || userCurrentImagePath)) {
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
}

export default handleUpdateUserImg
