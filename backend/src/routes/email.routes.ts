import express, { IRouter } from "express";
import { validateEmailInput } from "../middleware/emails/validateEmail.middleware";
import * as emailController from "./../controllers/email.controllers";

const router: IRouter = express.Router();

router.get(
  "/verify_email/:emailToken",
  validateEmailInput,
  emailController.markUserEmailVerified
);

router.post(
  "/send_verify_email",
  validateEmailInput,
  emailController.sendVerificationEmail
);

export default router;
