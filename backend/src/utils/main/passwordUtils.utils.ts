import bcrypt from "bcrypt";
import crypto from "crypto";
import ExpressError from "./ExpressError.utils";

export type HashPasswordResult = {
  salt: string;
  password: string;
};

/**
  @desc hash the given password using async bcrypt.
  @return an object containing the hashed password and the generated salt using async bcrypt
*/
export const hashPassword = async (
  password: string
): Promise<HashPasswordResult | undefined> => {
  try {
    const saltRounds: number = Number(process.env.SALT_ROUNDS_NUM as string);
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    return {
      salt,
      password: hash,
    };
  } catch (err: unknown) {
    if (err && err instanceof Error)
      throw new ExpressError(err.message, 400, err.name);
  }
};

/**
  @desc check if a password is the same as the hashed version or not.
  @return boolean indicating if password is the same as the hashed version or not
*/
export const verifyPassword = async (
  password: string,
  storedPassword: string,
  salt: string
): Promise<boolean | undefined> => {
  try {
    const hash = await bcrypt.hash(password, salt);
    return storedPassword === hash;
  } catch (err: unknown) {
    if (err && err instanceof Error)
      throw new ExpressError(err.message, 400, err.name);
  }
};

/**
  @desc validates the password and confirm password fields based on a certain pattern.
  @return boolean indicating the validity of the password fields
  @throws throw an error if there's a messing field, both fields are not equal or if any field does not match the pattern
*/
export const validatePassword = (password: string, confirmPassword: string) => {
  if (!password || !confirmPassword)
    throw new ExpressError(
      "password and confirm password fields should be defined!",
      400
    );

  if (password !== confirmPassword)
    throw new ExpressError("password and confirm password should match!", 400);

  const validateRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!.%*&])[A-Za-zd@$!.%*?&]{8,30}$",
    "g"
  );

  if (!validateRegex.test(password) || !validateRegex.test(confirmPassword))
    throw new ExpressError(
      "password and confirmPassword fields should match the same pattern",
      400
    );

  return true;
};

/**
 * @desc hash the given token string using crypto with a certain hashing algorithm.
 * @return the hashed string.
 */
export const hashResetPasswordTokenString = (token: string) => {
  const hash = crypto
    .createHash(process.env.RESET_PASSWORD_TOKEN_HASH_ALGO as string)
    .update(token)
    .digest("hex");

  return hash;
};
