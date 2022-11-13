import { NextFunction, Request, Response } from "express"
import fs from "fs"
import path from "path"
import { ContactsModel } from "../../models/mongoose/Contact.models"
import { ContactDoc } from "../../types/contact.types"
import ExpressError from "../../utils/main/ExpressError.utils"

/*
  *CASES WHEN TO DELETE THE CURRENT IMAGE AND CREATE A NEW ONE
  - user provided a new image and there is a current image.

  *CASES WHEN TO DELETE CURRENT IMAGE BUT NOT CREATE A NEW ONE:
  - user is requesting deleting the current image and provided no new image.

  *CASES WHEN NOT TO DELETE CURRENT IMAGE NOR CREATE A NEW ONE:
  - user did not request deleting the current image nor is providing a new on.
*/

const handleUpdateContactImg = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file && req.body.contactImg) return next()

  const { id } = req.params;

  const contact: ContactDoc | null = await ContactsModel.findById(id)

  if ((!req.file && !req.body.contactImage && contact?.contactImage)
    || (req.file && req.body.contactImage && contact?.contactImage)) {
    const contactImgRelativePath = contact?.contactImage as string

    const contactImgAbsolutePath = path.join(__dirname, "..", "..", "uploads", contactImgRelativePath)

    fs.unlink(contactImgAbsolutePath, (err: unknown) => {
      if (err && err instanceof Error) {
        next(new ExpressError(err?.message, 400, "DeleteImageError"))
      }
    })
  }

  next()
}

export default handleUpdateContactImg