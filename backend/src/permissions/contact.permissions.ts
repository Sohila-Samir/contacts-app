// models
import { ContactsModel } from "../models/mongoose/Contact.models";

// configs
import ROLES from "../configs/roles.configs";

// utils
import ExpressError from "../utils/main/ExpressError.utils";

// types
import { ContactDoc } from "../types/contact.types";
import { SchemaRole } from "../types/roles.types";

export const getScopedContacts = (
  allContacts: ContactDoc[],
  userRoles: SchemaRole,
  userID: string
) => {
  if (userRoles.includes(ROLES.ADMIN)) return allContacts;

  return allContacts.filter((contact) => contact.userID?.toString() === userID);
};

export const canViewContact = (
  contact: ContactDoc,
  userID: string,
  userRoles: SchemaRole
) => {
  if (!contact) throw new ExpressError("contact is not found!", 400);

  if (userRoles.includes(ROLES.ADMIN) || contact.userID?.toString() === userID)
    return contact;

  throw new ExpressError("unauthorized access!", 401);
};

export const canDeleteContact = async (
  contactID: string,
  userID: string,
  userRoles: SchemaRole
) => {
  try {
    const contact = await ContactsModel.findById(contactID);

    if (!contact) throw new ExpressError("contact is not found!", 400);

    if (
      userRoles.includes(ROLES.ADMIN) ||
      contact.userID?.toString() === userID
    )
      return true;

    throw new ExpressError("unauthorized access!", 401);
  } catch (err) {
    if (err && err instanceof (ExpressError || Error))
      throw new ExpressError(err.message, err.status || 400);
  }
};

export const canUpdateContact = async (userID: string, contactID: string) => {
  try {
    const contact = await ContactsModel.findById(contactID);

    if (!contact) throw new ExpressError("contact is not found!", 400);

    if (contact.userID?.toString() === userID) return true;

    throw new ExpressError("unauthorized access!", 401);
  } catch (err) {
    if (err && err instanceof (ExpressError || Error))
      throw new ExpressError(err.message, err.status || 400);
  }
};
