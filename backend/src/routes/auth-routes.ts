import express, { IRouter } from "express";

import verifyUser from "../middlewares/auth/verifyUser";
import * as authHandleFunctions from "./../controllers/auth-controller";

const router: IRouter = express.Router();

router.post("/logout", verifyUser, authHandleFunctions.logout);

router.post("/refresh-token", authHandleFunctions.refreshToken);

router.post("/login", authHandleFunctions.login);

router.post("/forgot-password", authHandleFunctions.forgotPassword);

router.post("/reset-password/:token", authHandleFunctions.resetPassword);

export default router;
