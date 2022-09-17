import mongoose from "mongoose";
import { Schema } from "mongoose";
import ExpressError from "../utils/main/ExpressError";
import * as contactsPermissions from "./../permessions/contacts";

import { ContactType, PhoneInputType } from "../Types/contact-types";
import { UserModel } from "./User";
import { UserType } from "../Types/user-types";
import { SchemaRole } from "../Types/role-type";

const contactsSchema = new Schema({
	name: {
		type: String,
		required: true,
		maxlength: 30,
		trim: true,
	},
	handle: {
		type: String,
		required: true,
		maxlength: 30,
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
		enum: ["family", "friends", "co-workers", "relatives", ""],
		default: null,
	},
	email: {
		type: String,
		default: null,
		trim: true,
	},
	address: {
		type: String,
		default: null,
		trim: true,
	},
	userID: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

export const ContactsModel = mongoose.model("Contact", contactsSchema);

export class Contact {
	async index(): Promise<ContactType[] | undefined> {
		try {
			const all: ContactType[] = await ContactsModel.find({});
			return all;
		} catch (err: unknown) {
			if (err instanceof (ExpressError || Error)) {
				throw new ExpressError(err.message, err.status || 400, err.name);
			}
		}
	}

	async getSingleContact(id: string): Promise<ContactType | undefined | null> {
		try {
			const contact: ContactType | null = await ContactsModel.findById(id);
			return contact;
		} catch (err: unknown) {
			if (err instanceof (ExpressError || Error)) {
				throw new ExpressError(err.message, err.status || 400, err.name);
			}
		}
	}

	async delete(
		id: string,
		userID: string,
		userRoles: SchemaRole
	): Promise<mongoose.Types.ObjectId | null | undefined> {
		try {
			const contact = (await ContactsModel.findById(id)) as ContactType;

			const isCanDeleteContact = contactsPermissions.canDeleteContact(contact, userID, userRoles);

			await ContactsModel.deleteOne({ _id: id });

			return isCanDeleteContact;
		} catch (err: unknown) {
			if (err instanceof (ExpressError || Error)) {
				throw new ExpressError(err.message, err.status || 400, err.name);
			}
		}
	}

	async create(contact: ContactType, userID: string): Promise<ContactType | undefined> {
		try {
			const user: UserType | null = await UserModel.findById(userID);

			if (!user) throw new ExpressError("user is not found!", 400);

			contact.userID = user as unknown as mongoose.Types.ObjectId;

			let newContact: ContactType = (await ContactsModel.create(contact)).depopulate("userID");

			return newContact;
		} catch (err: unknown) {
			if (err instanceof (ExpressError || Error)) {
				throw new ExpressError(err.message, err.status || 400, err.name);
			}
		}
	}

	async update(
		contactID: string,
		newData: ContactType,
		userID: string
	): Promise<ContactType | undefined | null> {
		try {
			const contact = (await ContactsModel.findById(contactID)) as ContactType;

			contactsPermissions.canUpdateContact(contact, userID);

			const updatedContact: ContactType | null = await ContactsModel.findByIdAndUpdate(
				contactID,
				newData,
				{
					new: true,
				}
			);
			return updatedContact;
		} catch (err: unknown) {
			if (err instanceof (ExpressError || Error)) {
				throw new ExpressError(err.message, err.status || 400, err.name);
			}
		}
	}
}
