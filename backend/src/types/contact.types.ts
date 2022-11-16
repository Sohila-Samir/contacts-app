import mongoose from "mongoose";

export type ContactIndexReturnData = { contacts: ContactDoc[]; pages: number };

export type ContactPhoneInputInfo = {
  internationalNumber: string;
  nationalNumber: string;
  countryCode: string;
};

export type ContactDoc = {
  _id: mongoose.Types.ObjectId;
  userID?: mongoose.Types.ObjectId;
  name: string;
  handle: string;
  phoneNumberInfo: ContactPhoneInputInfo;
  contactImg?: string;
  email?: string;
  address?: string;
  category?: "family" | "friends" | "co-workers" | "relatives" | "";
};
