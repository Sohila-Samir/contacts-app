// main
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

// models
import { UserModel } from "../models/mongoose/User.models";
import UserRefreshTokens from "../models/redis/RefreshTokens.models";

// utils
import ExpressError from "../utils/main/ExpressError.utils";

// interfaces
import { UserAuthTokens } from "../interfaces/auth.interfaces";
import constructUserCredentials from "../utils/auth/constructUserCredentials.utils";
import ROLES from "./roles.configs";

const clientID = process.env.GOOGLE_CLIENT_ID as string;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
const redirectUrl = process.env.GOOGLE_REDIRECT_URL as string;
const refreshTokens = new UserRefreshTokens();

// Sign-in using Google
const googleVerifyCb = async (
  accessToken: string,
  refreshToken: string,
  profile: GoogleStrategy.Profile,
  done: GoogleStrategy.VerifyCallback
) => {
  try {
    let user = await UserModel.findOne({ email: profile.emails?.[0].value });

    if (!user) {
      console.log("user has not registered before!");

      user = await UserModel.create({
        email: profile?.emails?.[0].value,
        roles: [ROLES.USER],
        name: profile?.name,
        username: profile?.username,
        userImg: profile?.photos?.[0],
        verified: profile?.emails?.[0].verified,
      });
    } else {
      console.log("user has registered before!");
    }

    if (!user?.verified || !profile?.emails?.[0].verified) {
      done(null, false, {
        message:
          "Email is not verified yet. Please verify your email first then try again!",
      });
      return;
    }

    const dataToSend = constructUserCredentials(user, accessToken);

    refreshTokens?.addRefreshToken(refreshToken, user?._id);

    done(null, dataToSend, { accessToken, refreshToken } as UserAuthTokens);
  } catch (err: unknown) {
    if (err instanceof (ExpressError || Error)) {
      return done(err);
    }
  }
};

const googleAuth = (passport: any) => {
  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID,
        clientSecret,
        callbackURL: redirectUrl,
        scope: ["profile", "email"],
      },
      googleVerifyCb
    )
  );
};

passport.serializeUser((user: any, done) => {
  return done(null, user?._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id)
  return done(false, user);
});

export default googleAuth;
