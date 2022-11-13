import { Response } from "express";

export const removeCookieFromResponse = (
  response: Response,
  cookieName: string
) => {
  response.clearCookie(cookieName);
};
