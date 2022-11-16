import express, { IRouter } from "express";
import * as contactsControllers from "../controllers/contact.controllers";

import ROLES from "../configs/roles.configs";
import authRole from "../middleware/auth/authRole.middleware";
import verifyUser from "../middleware/auth/verifyUserAccessToken.middleware";
import handleUpdateContactImg from "../middleware/contacts/handleUpdateContactImg.middleware";


const router: IRouter = express.Router();

router.post(
  "/new",
  verifyUser,
  handleUpdateContactImg,
  contactsControllers.newContact
);

router.get(
  "/index/admin",
  verifyUser,
  authRole(ROLES.ADMIN),
  contactsControllers.getAdminIndex
);

router.get("/index/user/:userID", contactsControllers.getUserIndex);

router.get("/:id", verifyUser, contactsControllers.getContact);

router.put(
  "/:id/update",
  verifyUser,
  handleUpdateContactImg,
  contactsControllers.updateContact
);

router.delete(
  "/:id/delete",
  verifyUser,
  handleUpdateContactImg,
  contactsControllers.deleteContact
);

export default router;
