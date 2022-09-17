import { IRouter } from "express";
import express from "express";

import * as authHandleFunctions from "./../controllers/auth-controller";
import verifyUser from "../middlewares/verifyUser";

const router: IRouter = express.Router();

router.post("/logout", verifyUser, authHandleFunctions.logout);

router.post("/refresh-token", authHandleFunctions.refreshToken);

router.post("/login", authHandleFunctions.login);

export default router;
