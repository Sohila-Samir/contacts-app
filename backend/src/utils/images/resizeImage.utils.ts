import fs from "fs";
import path from "path";
import sharp from "sharp";
import { SharpOptions } from "../../types/sharp.types";
import ExpressError from "../main/ExpressError.utils";

/**
 * @desc resize and save a certain image to the uploads folder
 * @params sharpOptions: `{imageBuffer: Buffer | undefined;
    imageWidth: number;
    imageHeight: number;
    format: "png" | "jpeg" | "jpg";
    folderName: string;
    imgRelativePath: string;}`
  @returns boolean (true) on a successful resize and saving image operation. otherwise throws an error.
*/
const resizeAndSaveImg = (
  sharpOptions: SharpOptions
): string => {
  const uniqueSuffix = Date.now()
  const imgStorageUniqueName = `${uniqueSuffix}_${sharpOptions.imgName}`
  const imgRelativePath = `/${sharpOptions.folderName}/${imgStorageUniqueName}`
  const imgFolderAbsolutePath = path.join(
    __dirname,
    "..",
    "..",
    "uploads",
    sharpOptions?.folderName
  );

  if (!sharpOptions.imageBuffer) {
    throw new ExpressError("no image was passed", 400, "SharpError");
  }

  fs.mkdir(imgFolderAbsolutePath, { recursive: true }, (err: unknown) => {
    if (err && err instanceof Error) {
      throw new ExpressError(err.message, 400, (err.name || "CreateImgDirFailure"));
    }

    sharp(sharpOptions?.imageBuffer)
      .resize(sharpOptions?.imageWidth, sharpOptions?.imageHeight)
      .toFormat(sharpOptions?.format)
      .png({
        force: true,
        quality: 100,
      })
      .toFile(imgFolderAbsolutePath + imgRelativePath)
      .catch((err) => {
        throw new ExpressError(err.message, err.status, (err.name || "SharpError"));
      });
  });

  return imgRelativePath;
};

export default resizeAndSaveImg;
