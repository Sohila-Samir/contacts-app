import { NextFunction, Request, Response } from "express";
import ROLES from "../configs/roles.configs";
import ExpressError from "../utils/main/ExpressError.utils";

export const authGetUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (
    res.locals.user.roles.includes(ROLES.ADMIN) ||
    res.locals.user._id === id
  ) {
    return next();
  }
  throw new ExpressError("unauthorized operation!", 401);
};

export const authDeleteUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (
    res.locals.user.roles.includes(ROLES.ADMIN) ||
    res.locals.user._id === id
  ) {
    return next();
  }
  throw new ExpressError("unauthorized operation!", 401);
};
