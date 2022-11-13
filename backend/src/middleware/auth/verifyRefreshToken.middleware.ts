import { NextFunction, Request, Response } from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";

import { UserAuthCredentials } from "../../types/auth.types";
import ExpressError from "../../utils/main/ExpressError.utils";

/**
 * @desc check if the provided refresh token valid using the RS256 algorithm and a publickey.
 * @params the refresh token to be validated.
 * @throws throw an error if there is no refresh token provided or if hashed refresh token does not match the hashed version of the provided refresh token.
 * @returns the refresh token payload if success.
 */
const verifyRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { rtn } = req.cookies;

    if (!rtn) {
      throw new ExpressError("you are not authenticated", 401);
    }

    const publicRefreshKey = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "..",
        "utils",
        "/auth",
        "/PUB_KEY_REFRESH.pem"
      ),
      "utf-8"
    );

    jwt.verify(
      rtn,
      publicRefreshKey,
      {
        algorithms: ["RS256"],
      },
      (err: unknown, decoded: unknown): void => {
        if (err) next(new ExpressError("refresh token is not valid!", 403));
        res.locals.refreshTokenPayload = decoded as
          | UserAuthCredentials
          | undefined;
        next();
      }
    );
  } catch (err: unknown) {
    if (err && err instanceof (ExpressError || Error)) {
      throw new ExpressError(err.message, err.status || 400, err.name);
    }
  }
};

export default verifyRefreshToken;
