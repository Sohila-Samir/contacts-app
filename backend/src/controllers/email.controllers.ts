// main
import { NextFunction, Request, Response } from "express";

// models
import { UserModel } from "../models/mongoose/User.models";

// utils
import sendEmail from "../utils/emails/sendEmail.utils";
import generateEmailVerificationToken from "../utils/jwt/generateEmailVerificationToken";
import ExpressError from "../utils/main/ExpressError.utils";

// configs
import emailTransporter, {
  getVerifyEmailTemplate,
} from "../configs/emailTransporter.configs";

// interfaces

/**
 * @desc send a verification email to the requested user containing a verification link.
 */
export const sendVerificationEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.id) throw new ExpressError("user id must be provided!", 404);

    const emailToken: string | undefined = generateEmailVerificationToken(
      req.body.id
    );

    const SERVER_HOST = process.env.SERVER_HOST;

    const verificationUrl = `${SERVER_HOST}/api/verify_email/${emailToken}`;

    // TODO: reactor email service logic later on
    const emailTemplate = getVerifyEmailTemplate(verificationUrl);

    sendEmail(emailTransporter, {
      from: `Conta ${process.env.GMAIL_ACC}`,
      subject: "Conta - Verification Email",
      to: req.body.email,
      html: `${emailTemplate}`,
    });

    res
      .status(200)
      .send({ success: true, message: "email is sent successfully!" });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc checks if the provided email exists in database and attached to a user that is existed too in the database.
 * @returns the user found in database associated with the provided email.
 * @throws throws an error if there is no user found in the database that is associated with the provided email.
 */
export const markUserEmailVerified = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decodedTokenPayload = res.locals?.emailVerifyTokenPayload;

    await UserModel.updateOne(
      { _id: decodedTokenPayload?._id },
      { $set: { verified: true } }
    );

    res.status(200).redirect(`${process.env.CLIENT_HOST}/verified`);
  } catch (err) {
    next(err);
  }
};
