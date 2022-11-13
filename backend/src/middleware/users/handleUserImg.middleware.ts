import { NextFunction, Request, Response } from "express"
import { SharpOptions } from "../../types/sharp.types"
import resizeAndSaveImg from "../../utils/images/resizeImage.utils"

const handleUserImg = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.file) return next()

  const folderName: string = req.file.fieldname

  const uniqueSuffix: number = Date.now()

  const imgName: string = `/${uniqueSuffix}_${req.file.originalname}`

  const imgRelativePath = `/${folderName}${imgName}`

  const sharpOptions: SharpOptions = {
    imageBuffer: req.file?.buffer,
    imageHeight: 250,
    imageWidth: 250,
    format: "png",
    folderName,
    imgName,
  }

  const isSuccess = resizeAndSaveImg(sharpOptions)

  if (isSuccess) {
    res.locals.userImgRelativePath = imgRelativePath
    return next()
  }
}

export default handleUserImg
