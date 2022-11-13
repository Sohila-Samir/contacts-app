// utils
import generateAccessToken from "../jwt/generateAccessToken";
import generateRefreshToken from "../jwt/generateRefreshToken.utils";
import ExpressError from "../main/ExpressError.utils";

// interfaces
import { UserDoc } from "../../interfaces/user.interfaces";

// types
import { UserAuthData } from "../../types/jwt.types";

/**
 * @desc generate user auth credentials containing an access and refresh token using a constructed payload data from the given user object.
 * @params `user` of type `UserDoc`.
 * @returns an object containing a jwt access and refresh token of type `UserAuthData`.
 */
const generateUserAuthData = (user: UserDoc): UserAuthData | undefined => {
  try {
    const accessToken = generateAccessToken(user) as string;

    const refreshToken = generateRefreshToken(user) as string;

    const userAuthData: UserAuthData = {
      accessToken,
      refreshToken,
    };

    return userAuthData;
  } catch (err: unknown) {
    if (err && err instanceof Error) {
      throw new ExpressError(err.message, 400, err.name);
    }
  }
};

export default generateUserAuthData;
