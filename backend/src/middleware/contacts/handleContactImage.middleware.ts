import { NextFunction, Request, Response } from "express";
import { SharpOptions } from "../../types/sharp.types";
import resizeAndSaveImg from "../../utils/images/resizeImage.utils";

const handleContactImage = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.file) return next();

  const folderName: string = req.file.fieldname;

  const uniqueSuffix: number = Date.now();

  const imgName = `/${uniqueSuffix}_${req.file?.originalname}`

  const imgRelativePath: string = `/${folderName}${imgName}`;

  const sharpOptions = {
    imageBuffer: req.file?.buffer,
    imageHeight: 250,
    imageWidth: 250,
    format: "png",
    folderName,
    imgName,
  };

  const isSuccess = resizeAndSaveImg(sharpOptions as SharpOptions);

  if (isSuccess) {
    res.locals.contactImagePath = imgRelativePath;
    return next();
  }
};
export default handleContactImage;
