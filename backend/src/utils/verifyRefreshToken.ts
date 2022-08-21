import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

import ExpressError from "./ExpressError";

const verifyRefreshToken = (refreshToken: string) => {
	try {
		let payload;

		if (!refreshToken) {
			throw new ExpressError("you are not authenticated", 401);
		}

		const publicRefreshKey = fs.readFileSync(path.join(__dirname, "/PUB_KEY_REFRESH.pem"), "utf-8");

		jwt.verify(
			refreshToken,
			publicRefreshKey,
			{
				algorithms: ["RS256"],
			},
			(err: any, decoded: any) => {
				if (err) throw new ExpressError("token is not valid!", 403);
				payload = decoded;
			}
		);

		return payload;
	} catch (err: unknown) {
		if (err && err instanceof (ExpressError || Error)) {
			throw new ExpressError(err.message, err.status || 400, err.name);
		}
	}
};

export default verifyRefreshToken;
