// main
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";

// utils
import ExpressError from "../main/ExpressError.utils";

// interfaces
import { AccessTokenPayload } from "../../interfaces/jwt.interfaces";
import { UserDoc } from "../../interfaces/user.interfaces";

/**
 * @desc asynchronously generate and sign an access token using a private key and attaching the provided payload to it.
 * @params an object of type `{_id: string; roles: AccessRole; verified: boolean; createdAt: Date;}` based on the custom "Payload" interface.
 * @returns the generated access token.
 */
const generateAccessToken = (user: UserDoc): string | undefined => {
  try {
    const payload: AccessTokenPayload = {
      _id: user._id,
      roles: user.roles,
      verified: user.verified,
      createdAt: user.createdAt,
    };

    const audience = ["http://localhost:3000"];

    const privateKey = fs.readFileSync(
      path.join(__dirname, "..", "/auth", "/PRV_KEY.PEM"),
      "utf-8"
    );

    let token: string | undefined;

    jwt.sign(
      payload,
      privateKey,
      {
        audience,
        expiresIn: "1h",
        algorithm: "RS256",
        issuer: process.env.SERVER_HOST,
      },
      (err: Error | null, encoded: string | undefined) => {
        if (err && err instanceof Error) {
          throw new ExpressError(err.name, 500, err.name);
        }
        token = encoded;
      }
    );

    return token;
  } catch (err: unknown) {
    if (err && err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

export default generateAccessToken;
