import { NextFunction, Request, Response } from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";

import ExpressError from "../../utils/main/ExpressError";

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("requested reached verifying phase");

    const publicKey = fs.readFileSync(
      path.join(__dirname, "..", "..", "/utils", "/auth", "/PUB_KEY.pem"),
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
