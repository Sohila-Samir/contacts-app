// main
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// utils
import ExpressError from "../../utils/main/ExpressError.utils";

// interfaces
import { EmailTokenPayload } from "../../interfaces/jwt.interfaces";

/**
 * @desc asynchronously verify the given email token with the email secret using `jwt.verify` method.
 * @return email token payload if the provided token is a valid email token.
 */
const verifyEmailVerifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { emailToken } = req.params;

    const secret = process.env.EMAIL_VERIFICATION_JWT_SECRET as string;

    jwt.verify(
      emailToken,
      secret,
      {
        algorithms: ["RS256"],
      },
      (err: unknown, decoded: unknown) => {
        if (err && err instanceof Error) {
          next(new ExpressError(err.message, 403, err.name));
        }
        res.locals.emailVerifyTokenPayload = decoded as
          | EmailTokenPayload
          | undefined;
        next();
      }
    );
  } catch (err: unknown) {
    if (err && err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

export default verifyEmailVerifyToken;
