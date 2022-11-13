// main
import jwt from "jsonwebtoken";

// utils
import ExpressError from "../main/ExpressError.utils";

/**
 * @params the user id related to the generated email verification token.
 * @returns the generated email verification token.
 */
const generateEmailVerificationToken = (userID: string) => {
  let token: string | undefined;

  jwt.sign(
    {
      _id: userID,
    },
    process.env.EMAIL_VERIFICATION_JWT_SECRET as string,
    {
      expiresIn: "10m",
    },
    (err: Error | null, encoded: string | undefined) => {
      if (err && err instanceof Error)
        throw new ExpressError(err.message, 500, err.name);
      token = encoded;
    }
  );

  return token;
};

export default generateEmailVerificationToken;
