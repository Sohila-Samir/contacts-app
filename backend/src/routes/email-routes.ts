import { IRouter } from "express";
import express from "express";
import * as emailController from "./../controllers/email-controller";

const router: IRouter = express.Router();

router.get("/verify_email/:emailToken", emailController.verifyEmail);

router.post("/send_verify_email", emailController.sendVerificationEmail);

export default router;
