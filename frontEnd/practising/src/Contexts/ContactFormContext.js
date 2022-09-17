import { createContext, useReducer } from "react";
import { formReducer, INITIAL_STATE } from "../Reducers/contactFormReducer";

const ContactFormContext = createContext();

export const ContactFormProvider = ({ children }) => {
	const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

	return (
		<ContactFormContext.Provider value={{ formData: state, dispatch }}>
			{children}
		</ContactFormContext.Provider>
	);
};

export default ContactFormContext;
