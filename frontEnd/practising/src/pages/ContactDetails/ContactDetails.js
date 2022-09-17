import { useParams } from "react-router-dom";

import CustomLink from "../../components/Main/CustomLink/CustomLink";
import DeleteContact from "../../components/DeleteContact/DeleteContact";

import useContacts from "../../hooks/useContacts";

import "./ContactDetails.css";
import defaultImg from "./assets/person.png";

const ContactDetails = () => {
	const { id } = useParams();
	const { contacts } = useContacts();
	const api = "http://localhost:2022";
	const [contact] = contacts.filter(contact => contact._id === id);
	const imageToShow = contact?.contactAvatar ? api + contact?.contactAvatar : defaultImg;

	return (
		<section className="contact-details-section">
			<div className="contact-details-page">
				<div className="contact-header-details-page">
					<div className="contact-avatar-container-details-page">
						<img src={imageToShow} alt="contact avatar" />
					</div>

					<div className="contact-primary-info">
						<h2>{contact?.name}</h2>
						<p>@{contact?.handle}</p>
					</div>

					<CustomLink
						URL={`/contacts/${contact._id}/update`}
						className="update-link"
						custom={true}
						isSecondary={false}
					/>
				</div>
				<div className="contact-body">
					<ul className="contact-secondary-option">
						<div className="contact-secondary-item-container">
							<p className="contact-secondary-item-label">Email:</p>
							<p className="contact-secondary-item">{contact?.email}</p>
							<a href={`mailto:${contact?.mail}`} className="contact-details-mail-link"></a>
						</div>
						<div className="contact-secondary-item-container">
							<p className="contact-secondary-item-label">International Number:</p>
							<p className="contact-secondary-item">
								{contact?.phoneNumberInfo.internationalNumber}
							</p>
							<a
								href={`tel:${contact.phoneNumberInfo.internationalNumber}`}
								className="contact-details-call-link"></a>
						</div>

						<div className="contact-secondary-item-container">
							<p className="contact-secondary-item-label">National Number:</p>
							<p className="contact-secondary-item">{contact?.phoneNumberInfo.nationalNumber}</p>
						</div>

						<div className="contact-secondary-item-container">
							<p className="contact-secondary-item-label">Country:</p>
							<p className="contact-secondary-item">{contact?.phoneNumberInfo.countryCode}</p>
						</div>

						<div className="contact-secondary-item-container">
							<p className="contact-secondary-item-label">Category:</p>
							<p className="contact-secondary-item">{contact?.category}</p>
						</div>

						<div className="contact-secondary-item-container">
							<p className="contact-secondary-item-label">Address:</p>
							<p className="contact-secondary-item">{contact?.address}</p>
						</div>
					</ul>

					<DeleteContact
						contactID={contact?._id || id}
						text="Delete Contact"
						className="delete-contact-details-page"
					/>
				</div>
			</div>
		</section>
	);
};

export default ContactDetails;
