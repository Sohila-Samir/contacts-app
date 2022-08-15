import mongoose from 'mongoose';

export type PhoneInputType = {
	internationalNumber: string;
	nationalNumber: string;
	countryCode: string;
};

export type ContactType = {
	name: string;
	handle: string;
	imgURL?: string;
	phoneNumberInfo: PhoneInputType;
};
