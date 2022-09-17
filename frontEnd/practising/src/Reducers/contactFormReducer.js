export const INITIAL_STATE = {
	name: "",
	handle: "",
	category: "",
	email: "",
	address: "",
	contactAvatar: "",
	phoneNumberInfo: {
		internationalNumber: "",
		nationalNumber: "",
		countryCode: "",
	},
};

export const formReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE_SINGLE_INPUT":
			return { ...state, [action.payload.name]: action.payload.value };
		case "CHANGE_PHONE_NUMBER":
			return {
				...state,
				phoneNumberInfo: { ...state.phoneNumberInfo, ...action.payload },
			};
		case "GET_CURRENT_STATE":
			return state;
		case "GET_INITIAL_STATE":
			return INITIAL_STATE;
		case "UPDATE_CURRENT_STATE":
			return { ...state, ...action.payload };
		case "RESET":
			return { ...state, ...INITIAL_STATE };
		default:
			return state;
	}
};
