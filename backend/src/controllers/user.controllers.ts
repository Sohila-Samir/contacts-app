// main
import { NextFunction, Request, Response } from "express";

// models
import User, { UserModel } from "../models/mongoose/User.models";

// utils
import { validatePassword } from "../utils/main/passwordUtils.utils";

const user = new User();

export const isUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { user: username } = req.query;

    const isUser = await UserModel.isUsernameTaken(username as string);

    res.status(200).json({ success: true, message: isUser });
  } catch (err) {
    if (err && err instanceof Error) {
      next(err);
    }
  }
};

export const switchToAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.body;

    const user = await UserModel.findById(id);

    const isMarked = await user?.markUserAdmin();

    res.status(200).json({ success: true, message: isMarked || false });
  } catch (err: unknown) {
    next(err);
  }
};

export const allUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await user.getUsers();
    res.status(202).json({ success: true, data: users });
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

    validatePassword(password, confirmPassword);

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
    const { _id } = res.locals.accessTokenPayload;

    const userFound = await user.getUser(_id);

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
    const { _id } = res.locals.accessTokenPayload;

    const deletedUser = await user.deleteUser(_id);

    return res.status(202).json({ success: true, data: deletedUser });
  } catch (err: unknown) {
    if (err && err instanceof Error) {
      next(err);
    }
  }
};
