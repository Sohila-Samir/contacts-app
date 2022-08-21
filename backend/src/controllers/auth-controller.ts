import { Request, Response, NextFunction } from "express";
import { UserType } from "../Types/user-types";

import { UserModel } from "../models/User";
import mongoose from "mongoose";

import generateUserAuthData from "../utils/generateUserAuthData";
import verifyRefreshToken from "../utils/verifyRefreshToken";

export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { password, email } = req.body;

		const user = (await UserModel.findAndVerifyPassword(email, password)) as UserType;

		const authData = generateUserAuthData(user, true);

		await UserModel.findAndUpdateRefreshToken(user._id, authData?.refreshToken as string, {
			isAdd: true,
		});

		res.status(200).json({
			success: true,
			data: authData,
		});
	} catch (err: unknown) {
		next(err);
	}
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { refreshToken } = req.body;
		const { id } = req.params;

		const payload = verifyRefreshToken(refreshToken);

		const authData = generateUserAuthData(payload as unknown as UserType, false);

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
		next(err);
	}
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;

		await UserModel.findAndUpdateRefreshToken(id as unknown as mongoose.Types.ObjectId, undefined, {
			isEmpty: true,
		});

		res.status(200).json({ success: true, message: "logged out successfully" });
	} catch (err: unknown) {
		next(err);
	}
};
