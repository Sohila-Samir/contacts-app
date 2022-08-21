import mongoose from "mongoose";
import { Schema } from "mongoose";
import ExpressError from "../utils/ExpressError";

import { ContactType, PhoneInputType } from "../Types/contact-types";

const contactsSchema = new Schema({
	name: {
		type: String,
		required: true,
		maxlength: 20,
		trim: true,
	},
	handle: {
		type: String,
		required: true,
		maxlength: 20,
		trim: true,
	},
	contactAvatar: {
		type: String,
		default: null,
	},
	phoneNumberInfo: {
		required: true,
		type: {} as PhoneInputType,
	},
	category: {
		type: String,
		enum: ["family", "friends", "co-workers", "relatives"],
		default: null,
	},
	email: {
		type: String,
		default: null,
		trim: true,
	},
});

export const ContactsModel = mongoose.model("Contact", contactsSchema);

export class Contact {
	async index(): Promise<ContactType[] | undefined> {
		try {
			const all: ContactType[] = await ContactsModel.find();
			return all;
		} catch (err: unknown) {
			if (err instanceof (ExpressError || Error)) {
				throw new ExpressError(err.message, 400, err.name);
			}
		}
	}

	async getSingleContact(id: string): Promise<ContactType | undefined | null> {
		try {
			const contact: ContactType | null = await ContactsModel.findById(id);
			return contact;
		} catch (err: unknown) {
			if (err instanceof (ExpressError || Error)) {
				throw new ExpressError(err.message, 400, err.name);
			}
		}
	}

	async delete(id: string): Promise<ContactType | undefined | null> {
		try {
			const deletedRecord: ContactType | null = await ContactsModel.findByIdAndDelete(id);
			return deletedRecord;
		} catch (err: unknown) {
			if (err instanceof (ExpressError || Error)) {
				throw new ExpressError(err.message, 400, err.name);
			}
		}
	}

	async create(contact: ContactType): Promise<ContactType | undefined> {
		try {
			const newContact: ContactType = await ContactsModel.create(contact);
			return newContact;
		} catch (err: unknown) {
			if (err instanceof (ExpressError || Error)) {
				throw new ExpressError(err.message, 400, err.name);
			}
		}
	}

	async update(contactID: string, contact: ContactType): Promise<ContactType | undefined | null> {
		try {
			const updatedContact: ContactType | null = await ContactsModel.findByIdAndUpdate(
				contactID,
				contact,
				{
					new: true,
				}
			);
			return updatedContact;
		} catch (err: unknown) {
			if (err instanceof (ExpressError || Error)) {
				throw new ExpressError(err.message, 400, err.name);
			}
		}
	}
}
