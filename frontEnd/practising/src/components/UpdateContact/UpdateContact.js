import { useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ContactForm from "./../ContactForm/ContactForm";

import { updateContact } from "../../axios/api-endpoints/Contact-endpoints";

import ContactFormContext from "../../Contexts/ContactFormContext";

import useContacts from "../../hooks/useContacts";

const UpdateContact = () => {
	const navigate = useNavigate();
	const { formData, dispatch } = useContext(ContactFormContext);
	const { contacts, dispatch: contactsDispatchFN } = useContacts();

	const { id } = useParams();

	useEffect(() => {
		const [contact] = contacts.filter(contact => contact._id === id);

		if (contact) {
			dispatch({ type: "UPDATE_CURRENT_STATE", payload: contact });
		}
	}, []);

	const submitFunction = async (privateInstance, signal, submitData) => {
		const res = await updateContact(privateInstance, submitData, signal);

		if (res) {
			contactsDispatchFN({ type: "UPDATE_CONTACTS", payload: { _id: id, newContact: res } });

			dispatch({ type: "RESET" });

			navigate("/contacts");
		}
	};

	return (
		<>
			<div className="contact-form-container">
				<Link className="close-contact-form " to="/contacts"></Link>

				<ContactForm
					submitFunction={submitFunction}
					dataToUse={formData}
					dataDispatchFunction={dispatch}
				/>
			</div>
		</>
	);
};

export default UpdateContact;
