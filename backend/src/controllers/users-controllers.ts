import { Request, Response, NextFunction } from 'express';

import User, { UserType } from '../models/User';
import { UserModel } from '../models/User';
import * as passwordUtils from './../utils/passwordUtils';
import ExpressError from '../utils/ExpressError';
import generateAccessToken from '../utils/generateAccessToken';
import generateRefreshToken from '../utils/generateRefreshToken';

const user = new User();

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { username, password, email } = req.body;
		const foundUser: UserType = UserModel.find({
			username,
			email,
		}) as unknown as UserType;
		const isSamePassword = passwordUtils.verifyPassword(
			password,
			foundUser?.password,
			foundUser?.salt as string
		);
		if (!foundUser && !isSamePassword) {
			return res.status(400).json({
				success: false,
				message: 'username or password is incorrect!',
			});
		}
		const payload = {
			_id: foundUser._id,
			admin: foundUser.admin as boolean,
			username: foundUser.username,
			email: foundUser.email,
		};
		const accessToken = generateAccessToken(payload);
		const refreshToken = generateRefreshToken(payload);

		res.status(200).json({
			success: true,
			data: {
				user: payload,
				accessToken,
				refreshToken,
			},
		});
	} catch (err: unknown) {
		if (err && err instanceof (ExpressError || Error)) {
			next(new ExpressError(err.message, 400, err.name));
		}
	}
};

export const newUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const createdUser = await user.createUser(req.body);
		res.status(202).json({ success: true, data: createdUser });
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			next(new ExpressError(err.message, 400, err.name));
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
		const foundUser = await user.getUser(id);
		res.status(202).json({ success: true, data: foundUser });
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			next(new ExpressError(err.message, 400, err.name));
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
		res.status(202).json({ success: true, data: deletedUser });
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			next(new ExpressError(err.message, 400, err.name));
		}
	}
};
