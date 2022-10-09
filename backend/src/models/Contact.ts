import mongoose, { Schema } from "mongoose";
import ExpressError from "../utils/main/ExpressError";

import {
  ContactIndexReturnType,
  ContactType,
  PhoneInputType,
} from "../Types/contact-types";
import { UserDoc } from "../Types/user-types";
import { UserModel } from "./User";

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
    selected: true,
  },
});

export const ContactsModel = mongoose.model("Contact", contactsSchema);

export class Contact {
  async adminIndex(
    page: number,
    limit: number
  ): Promise<ContactIndexReturnType | undefined> {
    try {
      const totalDocs = await ContactsModel.countDocuments();

      const pages = Math.ceil(totalDocs / (limit as number));

      const docsToSkip: number = page * limit - limit;

      const contacts: ContactType[] = await ContactsModel.find({})
        .skip(docsToSkip)
        .limit(limit);

      return { contacts, pages };
    } catch (err: unknown) {
      if (err instanceof (ExpressError || Error)) {
        throw new ExpressError(err.message, err.status || 400, err.name);
      }
    }
  }

  async userIndex(
    userID: string,
    page: number,
    limit: number
  ): Promise<ContactIndexReturnType | undefined> {
    try {
      const totalDocs = await ContactsModel.find({ userID }).countDocuments();

      const pages = Math.ceil(totalDocs / (limit as number));

      const docsToSkip: number = page * limit - limit;

      const contacts: ContactType[] = await ContactsModel.find({ userID })
        .skip(docsToSkip)
        .limit(limit);

      return { contacts, pages };
    } catch (err) {
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
    id: string
  ): Promise<mongoose.Types.ObjectId | null | undefined> {
    try {
      const deletedContactID = await ContactsModel.findByIdAndDelete({
        _id: id,
      });

      return deletedContactID?._id;
    } catch (err: unknown) {
      if (err instanceof (ExpressError || Error)) {
        throw new ExpressError(err.message, err.status || 400, err.name);
      }
    }
  }

  async addContact(
    contact: ContactType,
    userID: string
  ): Promise<ContactType | undefined> {
    try {
      const user: UserDoc | null = await UserModel.findById(userID);

      if (!user) throw new ExpressError("user is not found!", 400);

      contact.userID = user as unknown as mongoose.Types.ObjectId;

      return (await ContactsModel.create(contact)).depopulate(
        "userID"
      ) as ContactType;
    } catch (err: unknown) {
      if (err instanceof (ExpressError || Error)) {
        throw new ExpressError(err.message, err.status || 400, err.name);
      }
    }
  }

  async update(
    contactID: string,
    newData: ContactType
  ): Promise<ContactType | undefined | null> {
    try {
      const updatedContact: ContactType | null =
        await ContactsModel.findByIdAndUpdate(contactID, newData, {
          new: true,
        });

      return updatedContact;
    } catch (err: unknown) {
      if (err instanceof (ExpressError || Error)) {
        throw new ExpressError(err.message, err.status || 400, err.name);
      }
    }
  }
}
