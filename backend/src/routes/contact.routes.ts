import express, { IRouter } from "express";
import * as contactsControllers from "../controllers/contact.controllers";

import ROLES from "../configs/roles.configs";
import authRole from "../middleware/auth/authRole.middleware";
import verifyUser from "../middleware/auth/verifyUserAccessToken.middleware";
import handleContactImage from "../middleware/contacts/handleContactImage.middleware";
import handleDeleteContactImg from "../middleware/contacts/handleDeleteContactImg.middleware";
import handleUpdateContactImg from "../middleware/contacts/handleUpdateContactImg.middleware";


const router: IRouter = express.Router();

router.post(
  "/new",
  verifyUser,
  handleContactImage,
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
  handleContactImage,
  contactsControllers.updateContact
);

router.delete(
  "/:id/delete",
  verifyUser,
  handleDeleteContactImg,
  contactsControllers.deleteContact
);

export default router;
