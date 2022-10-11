import express, { IRouter } from "express";

import authRole from "../middlewares/auth/authRole";
import verifyUser from "../middlewares/auth/verifyUser";
import * as userPermissions from "./../permessions/users";

import ROLES from "../config/roles";

import * as userHandleFunctions from "./../controllers/users-controllers";

const router: IRouter = express.Router();

router.get("/exist", userHandleFunctions.isUserExist);

router.get(
  "/",
  verifyUser,
  authRole(ROLES.ADMIN),
  userHandleFunctions.allUsers
);

router.get(
  "/:id",
  verifyUser,
  userPermissions.authGetUser,
  userHandleFunctions.findUser
);

router.post("/new", userHandleFunctions.newUser);

router.delete(
  "/:id/delete",
  verifyUser,
  userPermissions.authDeleteUser,
  userHandleFunctions.deleteUser
);

export default router;
