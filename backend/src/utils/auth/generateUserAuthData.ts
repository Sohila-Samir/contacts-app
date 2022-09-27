import { generateAccessToken, generateRefreshToken } from "../jwt/jwtUtils";
import ExpressError from "../main/ExpressError";

import { UserAuthData } from "../../Types/jwt-types";
import { UserDoc } from "../../Types/user-types";

const generateUserAuthData = (user: UserDoc): UserAuthData | undefined => {
  try {
    const payload: Pick<UserDoc, "_id" | "roles" | "verified"> = {
      _id: user._id,
      roles: user.roles,
      verified: user.verified,
    };

    const accessToken = generateAccessToken(payload) as string;
    const refreshToken = generateRefreshToken(payload) as string;

    return {
      accessToken,
      refreshToken,
    };
  } catch (err: unknown) {
    if (err && err instanceof Error) {
      throw new ExpressError(err.message, 400, err.name);
    }
  }
};

export default generateUserAuthData;
