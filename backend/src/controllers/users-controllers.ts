import { Request, Response, NextFunction } from 'express';

import User from '../models/User';
import ExpressError from '../utils/ExpressError';
import verifyRefreshToken from '../utils/verifyRrefreshToken';

import { UserType } from '../Types/user-types';
import { UserModel } from '../models/User';

import generateUserAuthData from '../utils/generateUserAuthData';
import mongoose from 'mongoose';

const user = new User();

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { password, email } = req.body;

		const user = (await UserModel.findAndVerifyPassword(
			email,
			password
		)) as UserType;

		const authData = generateUserAuthData(user, true);

		await UserModel.findAndUpdateRefreshToken(
			user._id,
			authData?.refreshToken as string,
			{ isAdd: true }
		);

		res.status(200).json({
			success: true,
			data: authData,
		});
	} catch (err: unknown) {
		if (err && err instanceof (ExpressError || Error)) {
			next(err);
		}
	}
};

export const refreshToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { refreshToken } = req.body;
		const { id } = req.params;

		const payload = verifyRefreshToken(refreshToken);

		console.log('paylaod controller', payload);

		const authData = generateUserAuthData(
			payload as unknown as UserType,
			false
		);

		await UserModel.findAndUpdateRefreshToken(
			id as unknown as mongoose.Types.ObjectId,
			refreshToken,
			{
				isReplace: true,
				newToken: authData?.refreshToken as string,
			}
		);

		res.status(202).json({ success: true, data: authData });
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			next(err);
		}
	}
};

export const logout = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		await UserModel.findAndUpdateRefreshToken(
			id as unknown as mongoose.Types.ObjectId,
			undefined,
			{ isEmpty: true }
		);
		res.status(200).json({ success: true, message: 'logged out successfully' });
	} catch (err: unknown) {
		if (err && err instanceof Error) next(err);
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
		const foundUser = await user.getUser(id);
		res.status(202).json({ success: true, data: foundUser });
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
		res.status(202).json({ success: true, data: deletedUser });
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			next(err);
		}
	}
};
