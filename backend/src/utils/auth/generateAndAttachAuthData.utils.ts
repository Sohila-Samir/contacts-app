// main
import { Response } from "express";

// utils
import generateUserAuthData from "./generateUserAuthData.utils";

// interfaces
import { UserDoc } from "../../interfaces/user.interfaces";

// types
import { UserAuthData } from "../../types/jwt.types";
/**
  @desc generate auth data for a certain user then stores it in a cookie on the given response object
  @return the generated authData object which consists of refresh and access token
*/
const generateAndAttachAuthData = (
  user: UserDoc,
  response: Response
): UserAuthData => {
  const authData = generateUserAuthData(user) as UserAuthData;

  response.cookie("rtn", authData?.refreshToken, {
    httpOnly: true,
    domain: "localhost",
    sameSite: "strict",
  });

  response.locals.authData = authData;

  return authData;
};

export default generateAndAttachAuthData;
