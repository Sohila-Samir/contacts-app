import { IRouter } from "express";
import express from "express";

import verifyUser from "../middlewares/verifyUser";

import * as userHandleFunctions from "./../controllers/users-controllers";

const router: IRouter = express.Router();

router.post("/new", userHandleFunctions.newUser);

router.get("/:id", verifyUser, userHandleFunctions.findUser);

router.delete("/:id/delete", verifyUser, userHandleFunctions.deleteUser);

export default router;
