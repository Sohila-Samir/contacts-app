import express, { IRouter, NextFunction, Request, Response } from "express";
import passport from "passport";

import * as authHandleFunctions from "../controllers/auth.controllers";
import { CustomPassportAuthInfo } from "../interfaces/auth.interfaces";
import verifyUserAccessToken from "../middleware/auth/verifyUserAccessToken.middleware";
import ExpressError from "../utils/main/ExpressError.utils";

const router: IRouter = express.Router();

router.post("/sign-in/local", authHandleFunctions.signIn);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "success",
    failureRedirect: "error",
    authInfo: true,
  })
);

router.get("error", (req: Request, res: Response, next: NextFunction) => {
  const info = req.authInfo as CustomPassportAuthInfo;
  next(new ExpressError(info?.message as string, 400));
});

router.get("/google/success", (req, res, next) => {
  const info = req.authInfo as CustomPassportAuthInfo;
  res.cookie("rtn", info?.refreshToken);
  res.status(200).json({ success: true, data: info });
});

router.post("/logout", verifyUserAccessToken, authHandleFunctions.logout);

router.post("/refresh-token", authHandleFunctions.refreshToken);

router.post("/forgot-password", authHandleFunctions.sendForgotPasswordEmail);

router.post("/reset-password/:token", authHandleFunctions.resetPassword);

export default router;
