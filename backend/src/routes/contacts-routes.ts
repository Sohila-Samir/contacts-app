import { IRouter } from 'express';
import express from 'express';
import * as contactsControllers from './../controllers/contacts-controller';
import handleImage from '../middlewares/handle-images';
import removeContactAvatarImg from '../middlewares/remove-images';

const router: IRouter = express.Router();

router.get('/', contactsControllers.getAllContacts);

router.post('/new', handleImage, contactsControllers.addContact);

router.put(
	'/:id/update',
	removeContactAvatarImg,
	handleImage,
	contactsControllers.updateContact
);

router.delete(
	'/:id/delete',
	removeContactAvatarImg,
	contactsControllers.deleteContact
);

export default router;
