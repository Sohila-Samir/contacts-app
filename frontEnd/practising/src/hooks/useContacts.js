import { useContext } from "react";
import ContactsContext from "../Contexts/ContactsContext";

const useContacts = () => {
	return useContext(ContactsContext);
};

export default useContacts;
