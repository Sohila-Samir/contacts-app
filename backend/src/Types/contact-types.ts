import mongoose from "mongoose";

export type ContactIndexReturnType = { contacts: ContactType[]; pages: number };

export type PhoneInputType = {
  internationalNumber: string;
  nationalNumber: string;
  countryCode: string;
};

export type ContactType = {
  _id: mongoose.Types.ObjectId;
  userID?: mongoose.Types.ObjectId;
  name: string;
  handle: string;
  phoneNumberInfo: PhoneInputType;
  contactAvatar?: string;
  email?: string;
  address?: string;
  category?: "family" | "friends" | "co-workers" | "relatives" | "";
};
