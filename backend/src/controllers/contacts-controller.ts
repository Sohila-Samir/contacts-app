import { Contact } from "../models/Contact";
import { Request, Response, NextFunction } from "express";

const contact = new Contact();

export const getAllContacts = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const all = await contact.index();
		res.status(200).json({ success: true, data: all });
	} catch (err) {
		next(err);
	}
};

export const getContact = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		const foundContact = await contact.getSingleContact(id);
		res.status(200).json({ success: true, data: foundContact });
	} catch (err) {
		next(err);
	}
};

export const addContact = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const newContact = await contact.create(req.body);
		res.status(201).json({ success: true, data: newContact });
	} catch (err) {
		next(err);
	}
};

export const deleteContact = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		const deletedContact = await contact.delete(id);
		res.status(200).json({ success: true, data: deletedContact });
	} catch (err) {
		next(err);
	}
};

export const updateContact = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		const updatedContact = await contact.update(id, req.body);
		res.status(200).json({
			success: true,
			data: updatedContact,
		});
	} catch (err) {
		next(err);
	}
};
