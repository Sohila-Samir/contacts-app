import express, { IRouter } from "express";
import * as contactsControllers from "./../controllers/contacts-controller";

import ROLES from "../config/roles";
import authRole from "../middlewares/auth/authRole";
import verifyUser from "../middlewares/auth/verifyUser";
import removeContactAvatarImg from "../middlewares/contacts/remove-contact-image";
import handleImage from "../middlewares/handling-images/handle-images";

const router: IRouter = express.Router();

router.post("/new", verifyUser, handleImage, contactsControllers.newContact);

router.get(
  "/index/admin",
  verifyUser,
  authRole(ROLES.ADMIN),
  contactsControllers.getAdminIndex
);

router.get("/index/user", verifyUser, contactsControllers.getUserIndex);

router.get("/:id", verifyUser, contactsControllers.getContact);

router.put(
  "/:id/update",
  verifyUser,
  removeContactAvatarImg,
  handleImage,
  contactsControllers.updateContact
);

router.delete(
  "/:id/delete",
  verifyUser,
  removeContactAvatarImg,
  contactsControllers.deleteContact
);

export default router;
