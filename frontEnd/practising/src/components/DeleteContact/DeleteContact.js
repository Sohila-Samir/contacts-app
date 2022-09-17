import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import ContactsContext from "../../Contexts/ContactsContext";
import { deleteContact } from "../../axios/api-endpoints/Contact-endpoints";

import usePrivateInstance from "./../../hooks/usePrivateInstance";

import Button from "../Main/Button/Button";

const DeleteContact = ({ contactID, className, text }) => {
	const { dispatch } = useContext(ContactsContext);
	const privateInstance = usePrivateInstance();
	const navigate = useNavigate();

	const requestDeleteContact = async signal => {
		const res = await deleteContact(privateInstance, contactID, signal);

		if (res) {
			dispatch({ type: "DELETE_CONTACT", payload: { _id: res } });

			navigate("/contacts");
		}
	};

	const handleFunction = e => {
		const controller = new AbortController();

		requestDeleteContact(controller.signal);
	};

	return (
		<Button
			handleFunction={handleFunction}
			text={text}
			className={className}
			custom={true}
			isSecondary={false}
		/>
	);
};

export default DeleteContact;
