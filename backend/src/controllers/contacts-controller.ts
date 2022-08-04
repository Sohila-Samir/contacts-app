import { Contact } from '../models/Contact';
import { Request, Response, NextFunction } from 'express';

const contact = new Contact();

const getAllContacts = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const all = await contact.index();
		res.status(200).json(all);
	} catch (err) {
		next(err);
	}
};

const addContact = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const newContact = await contact.create({
			...req.body,
			avatarURL: res.locals.avatarURL,
		});
		console.log('created contact: ', newContact);
		console.log('contact body: ', req.body);

		res.status(201).json({ success: true, data: newContact });
	} catch (err) {
		next(err);
	}
};

const deleteContact = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		const deletedContact = await contact.delete(id);
		res.locals.deletedContact = deletedContact;
		next();
	} catch (e) {
		next(e);
	}
};

// const updateContact = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ): Promise<void> => {
// 	try {
// 		const { id } = req.params;
// 		const updatedContact = await contact.update(id, req.body);
// 		res.locals.avatarURL
// 			? res.status(201).json({
// 					success: true,
// 					data: {
// 						...updatedContact,
// 						avatarURL: res.locals.avatarURL,
// 					},
// 			  })
// 			: res.status(201).json({
// 					success: true,
// 					data: updatedContact,
// 			  });
// 	} catch (e) {
// 		next(e);
// 	}
// };

export { getAllContacts, addContact, deleteContact };
