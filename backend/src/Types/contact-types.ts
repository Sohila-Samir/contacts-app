export type PhoneInputType = {
	internationalNumber: string;
	nationalNumber: string;
	countryCode: string;
};

export type ContactType = {
	name: string;
	handle: string;
	phoneNumberInfo: PhoneInputType;
	contactAvatar?: string;
	email?: string;
	category?: "family" | "friends" | "co-workers" | "relatives" | null;
};
