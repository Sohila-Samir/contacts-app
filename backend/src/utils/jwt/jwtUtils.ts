import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

import { UserType } from "../../Types/user-types";

export const generateAccessToken = (
	payload: Pick<UserType, "_id" | "roles">
): string | Error | undefined => {
	try {
		const privateKey = fs.readFileSync(
			path.join(__dirname, "..", "/auth", "/PRV_KEY.PEM"),
			"utf-8"
		);

		return jwt.sign(payload, privateKey, {
			expiresIn: "10s",
			issuer: "http://localhost:2022",
			audience: "http://localhost:3000",
			algorithm: "RS256",
		});
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			return err;
		}
	}
};
/*---------------------------------------------------------*/

export const generateRefreshToken = (
	payload: Pick<UserType, "_id" | "roles">
): string | Error | undefined => {
	try {
		const privateRefreshKey = fs.readFileSync(
			path.join(__dirname, "..", "/auth", "/PRV_KEY_REFRESH.PEM"),
			"utf-8"
		);

		return jwt.sign(payload, privateRefreshKey, {
			expiresIn: "4d",
			issuer: "http://localhost:2022",
			audience: "http://localhost:3000",
			algorithm: "RS256",
		});
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			return err;
		}
	}
};

/*---------------------------------------------------------*/

export const emailVerificationToken = (userID: string) => {
	const token = jwt.sign(
		{
			_id: userID,
		},
		process.env.EMAIL_VERIFICATION_JWT_SECRET as string,
		{
			expiresIn: "6h",
		}
	);
	return token;
};

export const verifyEmailVerificationToken = (token: string) => {
	const secret = process.env.EMAIL_VERIFICATION_JWT_SECRET as string;
	const isValid = jwt.verify(token, secret);
	return isValid;
};
