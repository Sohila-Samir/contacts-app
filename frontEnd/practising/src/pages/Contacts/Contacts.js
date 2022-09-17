import { useEffect } from "react";
import NoContacts from "../errors/NoContacts/NoContacts";
import Heading from "../../components/Main/Heading/Heading";
import Contact from "../../components/Contact/Contact";
import CustomLink from "../../components/Main/CustomLink/CustomLink";

import useContacts from "./../../hooks/useContacts";

import "./Contacts.css";

const Contacts = () => {
	const { contacts } = useContacts();

	useEffect(() => {
		console.log("contacts mounted");
		return () => {
			console.log("contacts unmounted");
		};
	});

	return (
		<main>
			{!contacts?.length ? <NoContacts /> : <Heading text="Current Contacts" />}

			<ol className="contacts-list">
				{contacts?.map(contact => (
					<Contact key={contact?._id} contact={contact} />
				))}
			</ol>

			<CustomLink className="add-contact-link" URL="/contacts/new" text="+" custom={true} />
		</main>
	);
};

export default Contacts;
