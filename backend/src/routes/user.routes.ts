import express, { IRouter } from "express";

import authRole from "../middleware/auth/authRole.middleware";
import verifyUserAccessToken from "../middleware/auth/verifyUserAccessToken.middleware";
import * as userPermissions from "../permissions/user.permissions";

import ROLES from "../configs/roles.configs";

import * as userHandleFunctions from "../controllers/user.controllers";

const router: IRouter = express.Router();

router.get("/check-existence", userHandleFunctions.isUserExist);

router.get(
  "/",
  verifyUserAccessToken,
  authRole(ROLES.ADMIN),
  userHandleFunctions.allUsers
);

router.get(
  "/:id",
  verifyUserAccessToken,
  userPermissions.authGetUser,
  userHandleFunctions.findUser
);

router.post("/new", userHandleFunctions.newUser);

router.delete(
  "/:id/delete",
  verifyUserAccessToken,
  userPermissions.authDeleteUser,
  userHandleFunctions.deleteUser
);

export default router;
