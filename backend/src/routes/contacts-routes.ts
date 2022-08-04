import { IRouter } from 'express';
import express from 'express';
import * as contactsControllers from './../controllers/contacts-controller';
import handleImage from '../middlewares/handle-avatar-img';
import removeContactAvatarImg from '../middlewares/remove-avatar-img';

const router: IRouter = express.Router();

router.get('/', contactsControllers.getAllContacts);

router.post('/new', handleImage, contactsControllers.addContact);

router.delete(
	'/:id/delete',
	contactsControllers.deleteContact,
	removeContactAvatarImg
);

export default router;
