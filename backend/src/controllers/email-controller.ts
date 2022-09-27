import { NextFunction, Request, Response } from "express";
import path from "path";
import emailTransporter, {
  getEmailTemplate,
} from "../config/email-transporter";
import { UserModel } from "../models/User";
import { JwtPayload } from "../Types/jwt-types";
import {
  emailVerificationToken,
  verifyEmailVerificationToken,
} from "../utils/jwt/jwtUtils";
import ExpressError from "../utils/main/ExpressError";

export const sendVerificationEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.id) throw new ExpressError("user id must be provided!", 404);

    const emailToken = emailVerificationToken(req.body.id);

    const verificationUrl = `http://localhost:2022/api/verify_email/${emailToken}`;

    const emailTemplate = getEmailTemplate(verificationUrl);

    emailTransporter.sendMail({
      from: "Conta sohilasamir200@gmail.com",
      subject: "Conta - Email verification ",
      to: req.body.email,
      html: `${emailTemplate}`,
    });

    res.status(200).send({ success: true, message: "email is sent!" });
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { emailToken } = req.params;

    const isValidToken = verifyEmailVerificationToken(emailToken) as JwtPayload;

    await UserModel.updateOne(
      { _id: isValidToken?._id },
      { $set: { verified: true } }
    );

    res.status(200).sendFile("verified.html", {
      root: path.join(__dirname, "../../src/views"),
    });
  } catch (err) {
    next(err);
  }
};

export const checkIfEmailRegistered = async (email: string) => {
  const userEmail = await UserModel.findOne({ email });

  if (!userEmail)
    throw new ExpressError("could not find an account with this email!", 400);

  return userEmail;
};
