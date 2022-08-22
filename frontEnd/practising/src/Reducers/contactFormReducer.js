export const INITIAL_STATE = {
	name: "",
	handle: "",
	category: "",
	email: "",
	contactAvatar: "",
	phoneNumberInfo: {
		internationalNumber: "",
		nationalNumber: "",
		countryCode: "",
	},
};

export const formReducer = (state, action) => {
	switch (action.type) {
		case CHANGE_SINGLE_INPUT:
			return { ...state, [action.payload.name]: action.payload.value };
		case CHANGE_PHONE_NUMBER:
			return {
				...state,
				phoneNumberInfo: { ...state.phoneNumberInfo, [action.payload.name]: action.payload.value },
			};
		case GET_CURRENT_STATE:
			return state;
		case UPDATE_CURRENT_STATE:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
