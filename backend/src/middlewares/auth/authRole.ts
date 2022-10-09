import { NextFunction, Request, Response } from "express";
import ExpressError from "../../utils/main/ExpressError";

const authRole = (role: number) => {
  console.log("requested reached verifying role phase");
  return (_req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user.roles.includes(role)) {
      return next();
    }
    throw new ExpressError("unauthorized request!", 401);
  };
};

export default authRole;
