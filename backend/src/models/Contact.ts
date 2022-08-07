import mongoose from 'mongoose';
import ExpressError from '../utils/ExpressError';

const Schema = mongoose.Schema;

export type contactType = {
	name: string;
	handle: string;
	avatarURL: string;
	phoneNumberInfo: phoneInputType;
};

type phoneInputType = {
	internationalNumber: string;
	nationalNumber: string;
	countryCode: string;
};

const contactsSchema = new Schema({
	name: {
		type: String,
		required: true,
		maxlength: 30,
	},
	handle: {
		type: String,
		required: true,
	},
	avatarURL: {
		type: String,
		required: true,
	},
	phoneNumberInfo: {
		required: true,
		type: {} as phoneInputType,
	},
});

export const ContactsModel = mongoose.model('Contact', contactsSchema);

export class Contact {
	async index(): Promise<contactType[] | undefined> {
		try {
			const all: contactType[] = await ContactsModel.find();
			return all;
		} catch (err: unknown) {
			err instanceof Error
				? new ExpressError(err.message, undefined, err.name)
				: '';
		}
	}

	async delete(id: string): Promise<contactType | undefined | null> {
		try {
			const deletedRecord: contactType | null =
				await ContactsModel.findByIdAndDelete(id);
			return deletedRecord;
		} catch (err: unknown) {
			err instanceof Error
				? new ExpressError(err.message, undefined, err.name)
				: '';
		}
	}

	async create(contact: contactType): Promise<contactType | undefined> {
		try {
			const newContact: contactType = await ContactsModel.create(contact);
			return newContact;
		} catch (err: unknown) {
			err instanceof Error
				? new ExpressError(err.message, undefined, err.name)
				: '';
		}
	}

	async update(
		contactID: string,
		contact: contactType
	): Promise<contactType | undefined | null> {
		try {
			const updatedContact: contactType | null =
				await ContactsModel.findByIdAndUpdate(contactID, contact, {
					new: true,
				});
			return updatedContact;
		} catch (err: unknown) {
			err instanceof Error
				? new ExpressError(err.message, undefined, err.name)
				: '';
		}
	}
}
