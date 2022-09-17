import DeleteContact from "./../DeleteContact/DeleteContact";
import CustomLink from "../Main/CustomLink/CustomLink";
import defaultImg from "./assets/person.png";
import eyeIcon from "./assets/eye.png";

import "./Contact.css";

const Contact = ({ contact }) => {
	const api = "http://localhost:2022";
	const showContactImg = contact?.contactAvatar ? api + contact?.contactAvatar : defaultImg;

	return (
		<li className="contact">
			<div className="contact-header">
				<DeleteContact contactID={contact?._id} text="" className="delete-contact-contacts-page" />

				<div className="contact-avatar-container">
					<div className="show-image-wrapper">
						<img className="eye-icon" src={eyeIcon} alt="eye icon"></img>
					</div>
					<img className="contact-avatar-img" src={showContactImg} alt="contact avatar"></img>
				</div>

				<CustomLink
					URL={`/contacts/${contact?._id}/update`}
					className="update-link"
					custom={true}
					isSecondary={false}
				/>
			</div>

			<div className="contact-info-container">
				<span className="contact-name">{contact?.name}</span>
				<span className="contact-handle">@{contact?.handle}</span>
				<span className="contact-intNumber">{contact?.phoneNumberInfo?.internationalNumber}</span>
			</div>

			<CustomLink
				URL={`/contacts/${contact?._id}`}
				text="More Details"
				isSecondary={true}
				className="contact-more-details-btn"
			/>
		</li>
	);
};

export default Contact;
