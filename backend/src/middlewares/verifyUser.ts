import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import ExpressError from "../utils/main/ExpressError";

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
	try {
		const publicKey = fs.readFileSync(
			path.join(__dirname, "..", "/utils", "/auth", "/PUB_KEY.pem"),
			"utf8"
		);

		const authHeader = req.headers.authorization;

		if (!authHeader) throw new ExpressError("you are not authenticated", 401);

		const token = authHeader.split(" ")[1];

		jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err, decoded) => {
			if (err) throw new ExpressError("token is not valid", 403);
			res.locals.user = decoded;

			next();
		});
	} catch (err: unknown) {
		if (err && err instanceof (ExpressError || Error)) {
			next(err);
		}
	}
};

export default verifyUser;
