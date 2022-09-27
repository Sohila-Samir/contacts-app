import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import ExpressError from "../utils/main/ExpressError";
const user = new User();

export const isUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user: username } = req.query;

    const isUser = await user.checkUserExistence(username as string);

    if (isUser) return res.status(200).json({ success: true, message: true });

    return res.status(200).json({ success: true, message: false });
  } catch (err) {
    if (err && err instanceof Error) {
      next(err);
    }
  }
};

export const allUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await user.getUsers();

    return res.status(202).json({ success: true, data: users });
  } catch (err: unknown) {
    if (err && err instanceof Error) {
      next(err);
    }
  }
};

export const newUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, confirmPassword } = req.body;

    if (!confirmPassword || password !== confirmPassword)
      throw new ExpressError(
        "password and confirm password should match!",
        400
      );

    const createdUser = await user.createUser(req.body);

    return res.status(202).json({ success: true, data: createdUser });
  } catch (err: unknown) {
    if (err && err instanceof Error) {
      next(err);
    }
  }
};

export const findUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const userFound = await user.getUser(id);

    res.status(202).json({ success: true, data: userFound });
  } catch (err: unknown) {
    if (err && err instanceof Error) {
      next(err);
    }
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deletedUser = await user.deleteUser(id);

    return res.status(202).json({ success: true, data: deletedUser });
  } catch (err: unknown) {
    if (err && err instanceof Error) {
      next(err);
    }
  }
};
