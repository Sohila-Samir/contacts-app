import { NextFunction, Request, Response } from "express"
import fs from "fs"
import path from "path"
import { ContactsModel } from "../../models/mongoose/Contact.models"
import { ContactDoc } from "../../types/contact.types"
import ExpressError from "../../utils/main/ExpressError.utils"

/*
  CASES WHEN TO REMOVE IMAGE
  + deleting contact with contact image - RUN

  CASES WHEN TO NOT REMOVE IMAGE
  + deleting contact with no contact image - DON'T RUN
*/

const handleDeleteContactImg = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  const contact: ContactDoc | null = await ContactsModel.findById(id)

  if (contact?.contactImage) {
    // ! potential security risk
    const contactImgAbsolutePath = path.join(__dirname, "..", "..", "uploads", contact?.contactImage)

    fs.unlink(contactImgAbsolutePath, (err: unknown) => {
      if (err && err instanceof Error) {
        next(new ExpressError(err?.message, 400, "DeleteImageError"))
      }
    })
  }

  next()
}

export default handleDeleteContactImg