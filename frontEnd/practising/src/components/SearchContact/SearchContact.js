import { useContext, useState, useRef } from "react";
import ContactsContext from "../../Contexts/ContactsContext";

import CustomLink from "./../Main/CustomLink/CustomLink";

import "./SearchContact.css";
import searchIcon from "./assets/search.png";

const SearchContact = () => {
	const [queriedContacts, setQueriedContacts] = useState([]);
	const [query, setQuery] = useState("");
	const queryResultContainer = useRef(null);
	const { contacts } = useContext(ContactsContext);

	const updateQuery = e => {
		const { value } = e.target;
		setQuery(value);
		setQueriedContacts(
			contacts.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()))
		);
	};

	const removeBlurOtherContent = e => {
		e.stopPropagation();
		document.querySelector("nav").classList.remove("blur-content");
	};

	const hideQueryResultContainer = e => {
		if (queryResultContainer.current) {
			document.querySelector("nav").classList.remove("blur-content");
			queryResultContainer.current.style.display = "none";
		}
	};

	return (
		<div className="search-contact-box">
			<div className="search-contact-field">
				<div className="search-icon-container">
					<img src={searchIcon} alt="search-icon" />
				</div>
				<input
					type="search"
					className="search-contact-input"
					placeholder="Search for a contact..."
					value={query}
					onChange={updateQuery}
				/>
			</div>

			{query.length && queriedContacts.length ? (
				<div className="query-result-container" ref={queryResultContainer}>
					<ul className="query-result-list">
						{queriedContacts.map(contact => (
							<li key={contact._id} onClick={hideQueryResultContainer}>
								<CustomLink
									className="query-contact-link"
									isSecondary={false}
									custom={true}
									URL={`/contacts/${contact._id}`}
									text={contact.name}
								/>
							</li>
						))}
					</ul>
				</div>
			) : (
				""
			)}
		</div>
	);
};
export default SearchContact;
