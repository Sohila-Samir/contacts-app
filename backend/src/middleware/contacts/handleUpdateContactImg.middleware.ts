import { NextFunction, Request, Response } from "express"

import { SharpOptions } from "../../types/sharp.types"

import { ContactsModel } from "../../models/mongoose/Contact.models"
import { ContactDoc } from "../../types/contact.types"
import deleteImage from "../../utils/images/deleteImage.utils"
import resizeAndSaveImg from "../../utils/images/resizeImage.utils"

/*
  *CASES WHEN NOT TO DELETE AND CREATE A NEW IMAGE (add image for the first time)
  - user provided an image and contact document has no image field (null).

  *CASES WHEN TO DELETE THE CURRENT IMAGE AND CREATE A NEW ONE
  - user provided new image and there is a current image.

  *CASES WHEN TO DELETE CURRENT IMAGE BUT NOT CREATE A NEW ONE:
  - user deleted the contactImg field from the client side (wants to remove the current picture).

  *CASES WHEN NOT TO DELETE CURRENT IMAGE NOR CREATE A NEW ONE:
  - user did not upload a new image nor requested deleting the current image.
  - user is creating a new contact and did not provide an image.
*/
const handleUpdateContactImg = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //* BE CAREFUL WITH THE CREATE CONTACT SCENARIO (THERE IS NO "ID" PARAM ALREADY).

  const { id } = req.params

  const contact: ContactDoc | null = await ContactsModel.findById(id)

  const contactCurrentImagePath = contact?.contactImg as string

  // handle CASES WHEN NOT TO DELETE CURRENT IMAGE NOR CREATE A NEW ONE.
  if ((!req.file && !req.body.contactImg) || (!req.file && req.body.contactImg.toString() === contactCurrentImagePath?.toString())) return next()

  // handle CASES WHEN TO DELETE THE CURRENT IMAGE.
  if (contactCurrentImagePath && (req.file && req.body.contactImg) || (!req.file && !req.body.contactImg)) {
    deleteImage(contactCurrentImagePath)
  }

  // handle CASES WHEN TO CREATE NEW IMAGE.
  if (req.file && req.body.contactImg && (!contactCurrentImagePath || contactCurrentImagePath)) {
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
      res.locals.contactImgRelativePath = imgRelativePath
    }
  }
}

export default handleUpdateContactImg
