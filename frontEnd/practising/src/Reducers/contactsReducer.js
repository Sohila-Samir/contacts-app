export const INITIAL_STATE = [];

export const contactsReducer = (state, action) => {
	switch (action.type) {
		case "SET_CONTACTS":
			return [...action.payload];
		case "GET_ALL_CONTACTS":
			return state;
		case "ADD_CONTACT":
			return [...state, action.payload];
		case "DELETE_CONTACT":
			return state.filter(contact => contact._id !== action.payload._id);
		case "UPDATE_CONTACTS":
			return state.map(contact => {
				if (contact._id === action.payload._id) {
					return { ...contact, ...action.payload.newContact };
				} else {
					return contact;
				}
			});
		case "GET_CONTACT":
			return state.filter(contact => contact._id === action.payload._id);
		case "SEARCH_BY_NAME":
			return state.filter(
				contact => contact.name.toLowerCase() === action.payload.query.toLowerCase()
			);
		case "FILTER_BY_CATEGORY":
			return state.filter(
				contact => contact.category.toLowerCase() === action.payload.category.toLowerCase()
			);
		default:
			return state;
	}
};
