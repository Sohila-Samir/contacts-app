import { Request, Response, NextFunction } from "express";

import User from "../models/User";
import ExpressError from "../utils/ExpressError";

const user = new User();

export const newUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const createdUser = await user.createUser(req.body);
		if (createdUser) return res.status(202).json({ success: true, data: createdUser });

		throw new ExpressError("something went wrong, user is not created", 400);
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			next(err);
		}
	}
};

export const findUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(202).json({ success: true, data: res.locals.user });
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			next(err);
		}
	}
};
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		if ((res.locals.user && res.locals.user._id === id) || res.locals.user.admin) {
			const deletedUser = await user.deleteUser(id);
			return res.status(202).json({ success: true, data: deletedUser });
		}

		throw new ExpressError("not authorized to delete this account!", 403);
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			next(err);
		}
	}
};
