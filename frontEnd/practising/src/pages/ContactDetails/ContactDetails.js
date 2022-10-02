import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getContact } from "../../axios/api-endpoints/Contact-endpoints";
import usePrivateInstance from "../../hooks/usePrivateInstance";
import { INITIAL_STATE } from "../../Reducers/contactFormReducer";

import DeleteContact from "../../components/DeleteContact/DeleteContact";
import CustomLink from "../../components/Main/CustomLink/CustomLink";
import NotFound from "../errors/NotFound/NotFound";

import defaultImg from "./assets/person.png";
import "./ContactDetails.css";

const ContactDetails = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(INITIAL_STATE);
  const [contactError, setContactError] = useState(false);
  const privateInstance = usePrivateInstance();

  const api = "http://localhost:2022";
  const imageToShow = contact?.contactAvatar
    ? api + contact?.contactAvatar
    : defaultImg;

  useEffect(() => {
    const requestContact = async () => {
      const res = await getContact(privateInstance, id);
      if (!res) setContactError(true);
      if (res) setContact((prevState) => ({ ...prevState, ...res }));
    };

    requestContact();
  }, []);

  return contactError ? (
    <NotFound />
  ) : (
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
              {contact.email ? (
                <>
                  <label
                    className="contact-secondary-item-label"
                    id="email-details-label"
                  >
                    Email:
                  </label>
                  <p
                    className="contact-secondary-item"
                    aria-labelledby="email-details-label"
                  >
                    {contact?.email}
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="contact-details-mail-link"
                  >
                    -
                  </a>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="contact-secondary-item-container">
              <label
                className="contact-secondary-item-label"
                id="internationalNum-details-label"
              >
                International Number:
              </label>
              <p
                className="contact-secondary-item"
                aria-labelledby="internationalNum-details-label"
              >
                {contact?.phoneNumberInfo.internationalNumber}
              </p>
              <a
                href={`tel:${contact.phoneNumberInfo.internationalNumber}`}
                className="contact-details-call-link"
                aria-labelledby="internationalNum-details-label"
              ></a>
            </div>

            <div className="contact-secondary-item-container">
              <label
                id="nationalNum-details-label"
                className="contact-secondary-item-label"
              >
                National Number:
              </label>
              <p
                className="contact-secondary-item"
                aria-labelledby="nationalNum-details-label"
              >
                {contact?.phoneNumberInfo.nationalNumber}
              </p>
            </div>

            <div className="contact-secondary-item-container">
              <label
                id="country-details-label"
                className="contact-secondary-item-label"
              >
                Country:
              </label>
              <p
                className="contact-secondary-item"
                aria-labelledby="country-details-label"
              >
                {contact?.phoneNumberInfo.countryCode}
              </p>
            </div>

            <div className="contact-secondary-item-container">
              <label
                id="category-details-label"
                className="contact-secondary-item-label"
              >
                Category:
              </label>
              <p
                className="contact-secondary-item"
                aria-labelledby="category-details-label"
              >
                {contact?.category}
              </p>
            </div>

            <div className="contact-secondary-item-container">
              <label
                id="address-details-label"
                className="contact-secondary-item-label"
              >
                Address:
              </label>
              <p
                className="contact-secondary-item"
                aria-labelledby="address-details-label"
              >
                {contact?.address}
              </p>
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
