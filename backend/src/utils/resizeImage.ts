import sharp from "sharp";
import ExpressError from "./ExpressError";
import { SharpOptions } from "../Types/sharp-types";

const resizeImg = async (sharpOptions: SharpOptions): Promise<void | Error> => {
	if (!sharpOptions.imageBuffer) {
		throw new ExpressError("no image was passed", 400, "SharpError");
	}
	sharp(sharpOptions.imageBuffer)
		.resize(sharpOptions.imageWidth, sharpOptions.imageHeight)
		.toFormat(sharpOptions.format)
		.png({
			force: true,
			quality: 100,
		})
		.toFile(sharpOptions.saveImageDir)
		.catch(err => {
			throw new ExpressError(err.message, err.status, err.name);
		});
};

export default resizeImg;
