import { useEffect, useState } from "react";
import { isPossiblePhoneNumber, parsePhoneNumber } from "react-phone-number-input";

import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css";
import "./PhoneNumber.css";

const PhoneNumber = ({ handleDataFN, dataToUse }) => {
	const [value, setValue] = useState("");

	const [parsedPhoneNum, setParsedPhoneNum] = useState("");
	useEffect(() => {
		if (value && isPossiblePhoneNumber(value) && typeof value === "string") {
			setParsedPhoneNum(prevState => ({ ...prevState, ...parsePhoneNumber(value) }));
		}
	}, [value]);

	useEffect(() => {
		if (parsedPhoneNum) {
			handleDataFN({
				type: "CHANGE_PHONE_NUMBER",
				payload: {
					internationalNumber: parsedPhoneNum.number,
					nationalNumber: parsedPhoneNum.nationalNumber,
					countryCode: parsedPhoneNum.country,
				},
			});
		}
	}, [parsedPhoneNum]);

	return (
		<PhoneInput
			id="phoneNumber"
			name="phoneNumberInfo"
			className="contact-phone-num"
			defaultCountry={dataToUse?.phoneNumberInfo?.countryCode || "EG"}
			placeholder="xxx xxx xxxx"
			value={dataToUse?.phoneNumberInfo?.internationalNumber || value}
			onChange={setValue}
			smartCaret={true}
			required={true}
		/>
	);
};

export default PhoneNumber;
