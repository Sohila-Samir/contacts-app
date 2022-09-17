import { createContext, useReducer } from "react";
import { INITIAL_STATE, contactsReducer } from "../Reducers/contactsReducer";

const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(contactsReducer, INITIAL_STATE);

	return (
		<ContactsContext.Provider value={{ contacts: state, dispatch }}>
			{children}
		</ContactsContext.Provider>
	);
};

export default ContactsContext;
