import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import { UserDoc } from "../Types/user-types";

import mongoose from "mongoose";
import { UserModel } from "../models/User";

import emailTransporter from "../config/email-transporter";
import { JwtPayload } from "../Types/jwt-types";
import generateUserAuthData from "../utils/auth/generateUserAuthData";
import verifyRefreshToken from "../utils/jwt/verifyRefreshToken";
import ExpressError from "../utils/main/ExpressError";
import { checkIfEmailRegistered } from "./email-controller";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, confirmPassword, email } = req.body;

    if (confirmPassword === password) {
      const user = (await UserModel.findAndVerifyPassword(
        email,
        password
      )) as UserDoc;

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
      throw new ExpressError(
        "password and confirm password should match!",
        400
      );
    }
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

    const payload = verifyRefreshToken(refreshToken) as JwtPayload;

    const authData = generateUserAuthData(payload as unknown as UserDoc);

    const updated = await UserModel.findAndUpdateRefreshTokens(
      payload?._id as unknown as mongoose.Types.ObjectId,
      {
        isReplace: true,
        newRefreshToken: authData?.refreshToken,
      },
      refreshToken
    );

    console.log(updated);

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

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = res.locals.user;

    res.clearCookie("rtn");

    await UserModel.findAndUpdateRefreshTokens(
      _id as unknown as mongoose.Types.ObjectId,
      {
        isReset: true,
      }
    );

    res.status(200).json({ success: true, message: "logged out successfully" });
  } catch (err: unknown) {
    next(err);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const isUserRegistered = await checkIfEmailRegistered(email as string);

    const resetToken = isUserRegistered.addResetPasswordFields();

    await isUserRegistered.save();

    const emailTemplate = `
    <h1>Please click the button below to reset your password!</h1>
    <br>
    <a href="http://localhost:3000/reset-password/${resetToken}">Reset Password</a>
    `;

    try {
      emailTransporter.sendMail({
        from: "Conta sohilasamir200@gmail.com",
        subject: "Conta - Reset Password",
        to: email,
        html: emailTemplate,
      });
    } catch (err: unknown) {
      isUserRegistered.resetPasswordToken = undefined;
      isUserRegistered.resetPasswordExpire = undefined;

      await isUserRegistered.save();
      next(err);
    }

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

    if (!confirmPassword || !confirmPassword || password !== confirmPassword)
      throw new ExpressError(
        "Password and confirm password should be the same!"
      );

    const hashResetPasswordToken = crypto
      .createHash(process.env.RESET_PASSWORD_TOKEN_HASH_ALGO as string)
      .update(token)
      .digest("hex");

    const user = await UserModel.findOne({
      resetPasswordToken: hashResetPasswordToken,
    });

    if (!user) throw new ExpressError("Invalid or Expired reset session!", 400);

    if (Date.now() >= (user?.resetPasswordExpire as number))
      throw new ExpressError("Invalid or Expired reset session!");

    user.resetPassword(password);

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "password is reset successfully!" });
  } catch (err: unknown) {
    if (err && err instanceof Error) next(err);
  }
};
