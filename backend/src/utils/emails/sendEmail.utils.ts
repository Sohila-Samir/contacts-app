// main
import { Transporter } from "nodemailer";

// utils
import ExpressError from "../main/ExpressError.utils";

// types
import { EmailContent } from "../../types/email.types";

/**
 * @desc sends an email using the given transporter
 * @params `emailTransporter`: a configured transporter to send mail over.
 * `emailContent`: object containing the email content (i.e subject, from, to, etc).
 * `isAwaitEmail`: boolean value to indicate if function should await the email to send or not.
 * @return the transporter response if `isAwaitEmail` set to `true` otherwise returns nothing.
 */
const sendEmail = async (
  emailTransporter: Transporter,
  emailContent: EmailContent,
  isAwaitEmail: boolean = false
): Promise<void | unknown> => {
  try {
    if (isAwaitEmail) {
      return await emailTransporter.sendMail(emailContent);
    }
    emailTransporter.sendMail(emailContent);
  } catch (err: unknown) {
    if (err && err instanceof Error) throw new ExpressError(err.message, 400);
  }
};

export default sendEmail;
