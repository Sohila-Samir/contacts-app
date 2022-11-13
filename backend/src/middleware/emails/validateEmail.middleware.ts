// main
import { NextFunction, Request, Response } from "express";

// utils
import ExpressError from "../../utils/main/ExpressError.utils";

/**
 * @desc validates the incoming email input using a valid-email regex
 */
export const validateEmailInput = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const validationPattern = new RegExp(
    /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/,
    "g"
  );

  const { email } = req.body;

  if (validationPattern.test(email)) return next();

  return next(new ExpressError("invalid email signature!", 400));
};
