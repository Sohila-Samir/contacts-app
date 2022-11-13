// main
import { NextFunction, Request, Response } from "express";

// utils
import ExpressError from "../../utils/main/ExpressError.utils";

const authRole = (role: number) => {
  return (_req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user.roles.includes(role)) {
      return next();
    }
    throw new ExpressError("unauthorized request!", 401);
  };
};

export default authRole;
