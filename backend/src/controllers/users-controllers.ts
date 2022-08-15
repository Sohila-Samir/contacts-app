import { Request, Response, NextFunction } from 'express';

import User, { UserType } from '../models/User';
import { UserModel } from '../models/User';
import * as passwordUtils from './../utils/passwordUtils';
import ExpressError from '../utils/ExpressError';
import verifyRefreshToken from '../utils/verifyRrefreshToken';

import generateUserAuthData from '../utils/generateUserAuthData';
import mongoose from 'mongoose';

export type PayloadType = {
	_id: mongoose.Types.ObjectId | undefined;
	admin: boolean;
	email: string;
	username: string;
};

const user = new User();

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { username, password, email } = req.body;
		const foundUser: UserType = (await UserModel.findOne({
			username: username,
			email: email,
		})) as UserType;

		const isSamePassword = await passwordUtils.verifyPassword(
			password,
			foundUser.password,
			foundUser.salt as string
		);

		if (!foundUser || !isSamePassword) {
			return res.status(400).json({
				success: false,
				message: 'username or password is incorrect!',
			});
		}
		const authData = generateUserAuthData(foundUser, true);

		await UserModel.findByIdAndUpdate(foundUser._id, {
			...foundUser,
			refreshTokens: foundUser.refreshTokens?.push(
				authData?.refreshToken as string
			),
		});

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
		if (!refreshToken) {
			return res.status(401).json({
				success: false,
				message: 'you are not authenticated, sign in first',
			});
		}
		const payload = verifyRefreshToken(refreshToken);
		if (!payload) {
			return res
				.status(403)
				.json({ success: false, message: 'token is not valid!' });
		}

		const dbUser = (await UserModel.findById(payload._id)) as UserType;

		if (dbUser.refreshTokens?.includes(refreshToken)) {
			const authData = generateUserAuthData(payload as UserType);

			const filteredRefreshTokens = dbUser.refreshTokens?.filter(
				(token) => token !== refreshToken
			);
			filteredRefreshTokens.push(authData?.refreshToken as string);

			const updatedUser = {
				dbUser,
				refreshTokens: filteredRefreshTokens,
			};

			console.log('new user', updatedUser);

			await UserModel.findByIdAndUpdate(payload._id, updatedUser, {
				new: true,
				runValidators: true,
			});

			res.status(200).json(authData);
		} else {
			res.status(403).json({
				success: false,
				message: 'invalid token, token reuse dedicated!',
			});

			await UserModel.findByIdAndUpdate(
				dbUser._id,
				{ refreshTokens: [] },
				{ new: true, runValidators: true }
			);
		}
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
		await UserModel.findByIdAndUpdate(
			id,
			{ refreshTokens: [] },
			{ new: true, runValidators: true }
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
