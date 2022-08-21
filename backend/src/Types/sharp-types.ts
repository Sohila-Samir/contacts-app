export type SharpOptions = {
	imageBuffer: Buffer | undefined;
	imageWidth: number;
	imageHeight: number;
	format: "png" | "jpeg" | "jpg";
	saveImageDir: string;
};
