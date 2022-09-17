import { IRouter } from "express";
import express from "express";
import * as contactsControllers from "./../controllers/contacts-controller";

import handleImage from "../middlewares/handle-images";
import removeContactAvatarImg from "../middlewares/remove-contact-image";
import verifyUser from "../middlewares/verifyUser";

const router: IRouter = express.Router();

router.post("/new", verifyUser, handleImage, contactsControllers.addContact);

router.get("/", verifyUser, contactsControllers.getAllContacts);

router.get("/:id", verifyUser, contactsControllers.getContact);

router.put(
	"/:id/update",
	verifyUser,
	removeContactAvatarImg,
	handleImage,
	contactsControllers.updateContact
);

router.delete("/:id/delete", verifyUser, removeContactAvatarImg, contactsControllers.deleteContact);

export default router;
