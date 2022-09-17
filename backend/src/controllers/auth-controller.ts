import { Request, Response, NextFunction } from "express";
import { UserType } from "../Types/user-types";

import { UserModel } from "../models/User";
import mongoose from "mongoose";

import generateUserAuthData from "../utils/auth/generateUserAuthData";
import verifyRefreshToken from "../utils/jwt/verifyRefreshToken";
import ExpressError from "../utils/main/ExpressError";
import { JwtPayload } from "../Types/jwt-types";

export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { password, confirmPassword, email } = req.body;

		if (confirmPassword === password) {
			const user = (await UserModel.findAndVerifyPassword(email, password)) as UserType;

			const authData = generateUserAuthData(user);

			await UserModel.findAndUpdateRefreshTokens(
				user._id,
				{
					isAdd: true,
				},
				authData?.refreshToken
			);

			res.cookie("rtn", `${authData?.refreshToken}`, {
				httpOnly: true,
				domain: "localhost",
				sameSite: "strict",
			});

			res.status(200).json({
				success: true,
				data: {
					user: user._id,
					roles: user.roles,
					accessToken: authData?.accessToken,
					verified: user?.verified,
				},
			});
		} else {
			throw new ExpressError("password and confirm password should match!", 400);
		}
	} catch (err: unknown) {
		next(err);
	}
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { rtn: refreshToken } = req.cookies;

		const payload = verifyRefreshToken(refreshToken) as JwtPayload;

		const authData = generateUserAuthData(payload as unknown as UserType);

		await UserModel.findAndUpdateRefreshTokens(
			payload?._id as unknown as mongoose.Types.ObjectId,
			{
				isReplace: true,
				newRefreshToken: authData?.refreshToken,
			},
			refreshToken
		);

		res.cookie("rtn", `${authData?.refreshToken}`, {
			httpOnly: true,
			domain: "localhost",
			sameSite: "strict",
		});

		res.status(202).json({
			success: true,
			data: {
				user: payload?._id,
				roles: payload?.roles,
				accessToken: authData?.accessToken,
				verified: payload?.verified,
			},
		});
	} catch (err: unknown) {
		if (err && err instanceof (ExpressError || Error)) {
			err.status === 403 && res.clearCookie("rtn");
			next(err);
		}
	}
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { _id } = res.locals.user;

		res.clearCookie("rtn");

		await UserModel.findAndUpdateRefreshTokens(_id as unknown as mongoose.Types.ObjectId, {
			isReset: true,
		});

		res.status(200).json({ success: true, message: "logged out successfully" });
	} catch (err: unknown) {
		next(err);
	}
};
