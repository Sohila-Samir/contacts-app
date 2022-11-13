// main
import { NextFunction, Request, Response } from "express";

// models
import { UserModel } from "../models/mongoose/User.models";
import UserRefreshTokens from "../models/redis/RefreshTokens.models";

// configs
import emailTransporter, {
  getResetPasswordTemplate,
} from "../configs/emailTransporter.configs";

// utils
import constructUserCredentials from "../utils/auth/constructUserCredentials.utils";
import generateAndAttachAuthData from "../utils/auth/generateAndAttachAuthData.utils";
import checkUserEmailExistence from "../utils/emails/checkUserEmailExistence.utils";
import sendEmail from "../utils/emails/sendEmail.utils";
import ExpressError from "../utils/main/ExpressError.utils";
import { removeCookieFromResponse } from "../utils/main/generalResponseUtils.utils";
import {
  hashResetPasswordTokenString,
  validatePassword,
} from "../utils/main/passwordUtils.utils";

// interfaces
import { UserDoc } from "../interfaces/user.interfaces";
const userRefreshTokens = new UserRefreshTokens();

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, confirmPassword, email } = req.body;

    validatePassword(password, confirmPassword);

    const user = (await UserModel.findAndVerifyPassword(
      email,
      password
    )) as UserDoc;

    if (!user?.checkUserEmailValidityStatus())
      throw new ExpressError(
        "Provided email is not verified yet. Please verify your email first!"
      );

    const authData = generateAndAttachAuthData(user, res);

    const userCredentials = constructUserCredentials(
      user,
      authData?.accessToken
    );

    res.status(200).json({
      success: true,
      data: userCredentials,
    });
  } catch (err: unknown) {
    next(err);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rtn: refreshToken } = req.cookies;

    const decodedPayload = res.locals?.refreshTokenPayload;

    const newAuthData = generateAndAttachAuthData(
      decodedPayload as unknown as UserDoc,
      res
    );

    userRefreshTokens.removeAndAddRefreshToken(
      refreshToken,
      newAuthData?.refreshToken,
      decodedPayload?._id
    );

    const userNewCredentials = constructUserCredentials(
      decodedPayload,
      newAuthData?.accessToken
    );

    res.status(202).json({
      success: true,
      data: userNewCredentials,
    });
  } catch (err: unknown) {
    if (err && err instanceof (ExpressError || Error)) {
      err.status === 403 && removeCookieFromResponse(res, "rtn");
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
    const { _id } = res.locals.accessTokenPayload;

    removeCookieFromResponse(res, "rtn");

    userRefreshTokens.resetRefreshTokens(_id);

    res.status(200).json({ success: true, message: "logged out successfully" });
  } catch (err: unknown) {
    next(err);
  }
};

/**
 * @desc send a forgot password email for user to reset their password.
 */
export const sendForgotPasswordEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const user = await checkUserEmailExistence(email as string);

    if (!user?.checkUserEmailValidityStatus())
      throw new ExpressError(
        "Provided email is not verified yet. Please verify your email first!"
      );

    const resetToken = user?.populateResetPasswordFields();

    await user.save();

    const template = getResetPasswordTemplate(resetToken);

    sendEmail(emailTransporter, {
      from: `Conta ${process.env.GMAIL_ACC}`,
      subject: "Conta - Reset Password",
      to: email,
      html: template,
    });

    res.status(200).json({
      success: true,
      message:
        "a reset password email was sent. please check your email inbox to reset your password!",
    });
  } catch (err: unknown) {
    if (err && err instanceof Error) {
      next(err);
    }
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;

    const { password, confirmPassword } = req.body;

    const hashedToken = hashResetPasswordTokenString(token);

    const user = await UserModel.findOne({
      resetPasswordToken: hashedToken,
    });

    if (!user || Date.now() >= (user?.resetPasswordExpire as number))
      throw new ExpressError("Invalid or Expired reset token session!", 400);

    validatePassword(password, confirmPassword);

    user.updatePassword(password);

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "password is reset successfully!" });
  } catch (err: unknown) {
    if (err && err instanceof Error) next(err);
  }
};
