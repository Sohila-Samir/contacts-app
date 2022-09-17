import mongoose from "mongoose";

import { Request, Response, NextFunction } from "express";
import { Contact } from "../models/Contact";
import { ContactType } from "../Types/contact-types";

import * as contactsPermissions from "./../permessions/contacts";

const contact = new Contact();

export const getAllContacts = async (
	_req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const all = await contact.index();

		const dataToSend = contactsPermissions.getScopedContacts(
			all as ContactType[],
			res.locals.user.roles,
			res.locals.user._id
		);

		res.status(200).json({ success: true, data: dataToSend });
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

		const authenticatedUser = res.locals.user;

		const foundContact = (await contact.getSingleContact(id)) as ContactType;

		const authorizedContact = contactsPermissions.canViewContact(
			foundContact,
			authenticatedUser._id,
			authenticatedUser.roles
		);

		res.status(201).json({ success: true, data: authorizedContact });
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
		const newContact = await contact.create(req.body, res.locals.user._id);

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

		const authenticatedUser = res.locals.user;

		const deletedContactId = (await contact.delete(
			id,
			authenticatedUser._id,
			authenticatedUser.roles
		)) as mongoose.Types.ObjectId;

		res.status(200).json({ success: true, data: deletedContactId });
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

		const updatedContact = await contact.update(id, req.body, res.locals.user._id);

		res.status(200).json({
			success: true,
			data: updatedContact,
		});
	} catch (err) {
		next(err);
	}
};
