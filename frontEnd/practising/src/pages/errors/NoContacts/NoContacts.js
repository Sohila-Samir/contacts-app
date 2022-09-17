import Heading from "../../../components/Main/Heading/Heading";

import empty from "./assets/empty.svg";
import "./NoContacts.css";

const NoContacts = () => {
	return (
		<div className="no-contacts-container">
			<Heading text="Oops! Found no Contacts" />

			<div className="no-contacts-img-container">
				<img className="no-contacts-img" src={empty} alt="no contacts img"></img>
			</div>
		</div>
	);
};

export default NoContacts;
