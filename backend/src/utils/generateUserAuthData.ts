import { generateAccessToken, generateRefreshToken } from "./jwtUtils";
import ExpressError from "./ExpressError";

import { UserAuthData } from "../Types/jwt-types";
import { UserType } from "../Types/user-types";

const generateUserAuthData = (
	user: UserType,
	isUser: boolean = false
): UserAuthData | undefined => {
	try {
		const payload: Omit<UserType, "password" | "salt" | "refreshTokens"> = {
			_id: user._id,
			name: user.name,
			username: user.username,
			email: user.email,
			admin: user.admin,
			birthday: user.birthday,
			phoneNumber: user.phoneNumber,
			userAvatar: user.userAvatar,
		};

		const accessToken = generateAccessToken(payload) as string;
		const refreshToken = generateRefreshToken(payload) as string;

		if (isUser) {
			return {
				user: payload,
				accessToken,
				refreshToken,
			};
		} else {
			return {
				accessToken,
				refreshToken,
			};
		}
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			throw new ExpressError(err.message, 400, err.name);
		}
	}
};

export default generateUserAuthData;
