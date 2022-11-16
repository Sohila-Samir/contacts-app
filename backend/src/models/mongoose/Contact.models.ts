// main
import mongoose, { Schema } from "mongoose";

// models
import { UserModel } from "./User.models";

// utils
import ExpressError from "../../utils/main/ExpressError.utils";

// interfaces
import { UserDoc } from "../../interfaces/user.interfaces";

// types
import {
  ContactDoc,
  ContactIndexReturnData,
  ContactPhoneInputInfo
} from "../../types/contact.types";

const contactsSchema = new Schema<ContactDoc>({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    selected: true,
  },
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
  contactImg: {
    type: String,
    default: null,
  },
  phoneNumberInfo: {
    required: true,
    type: {} as ContactPhoneInputInfo,
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
});

export const ContactsModel = mongoose.model("Contact", contactsSchema);

export class Contact {
  async adminIndex(
    page: number,
    limit: number
  ): Promise<ContactIndexReturnData | undefined> {
    try {
      const totalDocs = await ContactsModel.countDocuments();

      const pages = Math.ceil(totalDocs / (limit as number));

      const docsToSkip: number = page * limit - limit;

      const contacts: ContactDoc[] = await ContactsModel.find({})
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
  ): Promise<ContactIndexReturnData | undefined> {
    try {
      const totalDocs = await ContactsModel.find({ userID }).countDocuments();

      const pages = Math.ceil(totalDocs / (limit as number));

      const docsToSkip: number = page * limit - limit;

      const contacts: ContactDoc[] = await ContactsModel.find({ userID })
        .skip(docsToSkip)
        .limit(limit);

      return { contacts, pages };
    } catch (err) {
      if (err instanceof (ExpressError || Error)) {
        throw new ExpressError(err.message, err.status || 400, err.name);
      }
    }
  }

  async getSingleContact(id: string): Promise<ContactDoc | undefined | null> {
    try {
      const contact: ContactDoc | null = await ContactsModel.findById(id);
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
    contact: ContactDoc,
    userID: string
  ): Promise<ContactDoc | undefined> {
    try {
      const user: UserDoc | null = await UserModel.findById(userID);

      if (!user) throw new ExpressError("user is not found!", 400);

      contact.userID = user as unknown as mongoose.Types.ObjectId;

      return (await ContactsModel.create(contact)).depopulate(
        "userID"
      ) as ContactDoc;
    } catch (err: unknown) {
      if (err instanceof (ExpressError || Error)) {
        throw new ExpressError(err.message, err.status || 400, err.name);
      }
    }
  }

  async update(
    contactID: string,
    newData: ContactDoc
  ): Promise<ContactDoc | undefined | null> {
    try {
      const updatedContact: ContactDoc | null =
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
