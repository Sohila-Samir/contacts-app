import ExpressError from "../utils/main/ExpressError";
import ROLES from "../config/roles";

import { ContactType } from "../Types/contact-types";

import { SchemaRole } from "../Types/role-type";

export const getScopedContacts = (
	allContacts: ContactType[],
	userRoles: SchemaRole,
	userID: string
) => {
	if (userRoles.includes(ROLES.ADMIN)) return allContacts;
	return allContacts.filter(contact => contact.userID?.toString() === userID);
};

export const canViewContact = (contact: ContactType, userID: string, userRoles: SchemaRole) => {
	if (!contact) throw new ExpressError("contact is not found!", 400);

	if (userRoles.includes(ROLES.ADMIN) || contact.userID?.toString() === userID) return contact;

	throw new ExpressError("unauthorized access!", 401);
};

export const canDeleteContact = (contact: ContactType, userID: string, userRoles: SchemaRole) => {
	if (!contact) throw new ExpressError("contact is not found!", 400);

	if (userRoles.includes(ROLES.ADMIN) || contact.userID?.toString() === userID) return contact._id;

	throw new ExpressError("unauthorized access!", 401);
};

export const canUpdateContact = (contact: ContactType, userID: string) => {
	if (!contact) throw new ExpressError("contact is not found!", 400);

	if (contact.userID?.toString() === userID) return contact;

	throw new ExpressError("unauthorized access!", 401);
};
