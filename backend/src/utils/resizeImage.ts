import sharp from 'sharp';

export type SharpOptions = {
	imageBuffer: Buffer | undefined;
	imageWidth: number;
	imageHeight: number;
	format: 'png' | 'jpeg' | 'jpg';
	saveImageDir: string;
};

const resizeImg = async (sharpOptions: SharpOptions): Promise<void | Error> => {
	if (!sharpOptions.imageBuffer) {
		return new Error('sharpError: no image was passed');
	}
	sharp(sharpOptions.imageBuffer)
		.resize(sharpOptions.imageWidth, sharpOptions.imageHeight)
		.toFormat(sharpOptions.format)
		.png({
			force: true,
			quality: 100,
		})
		.toFile(sharpOptions.saveImageDir)
		.catch((err) => new Error(`sharpError: ${err.message}`));
};

export default resizeImg;
