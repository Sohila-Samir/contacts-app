import generateAccessToken from './generateAccessToken';
import generateRefreshToken from './generateRefreshToken';
import ExpressError from './ExpressError';

import { PayloadType, UserAuthData } from '../Types/jwt-types';
import { UserType } from '../Types/user-types';

const generateUserAuthData = (
	user: UserType,
	isUser: boolean = false
): UserAuthData | undefined => {
	try {
		const payload: PayloadType = {
			_id: user._id,
			admin: user.admin as boolean,
			username: user.username,
			email: user.email,
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
