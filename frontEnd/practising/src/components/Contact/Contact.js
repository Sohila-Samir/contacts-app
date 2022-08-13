import DeleteContact from "./../DeleteContact/DeleteContact";
import CustomLink from "../Main/CustomLink/CustomLink";
import defaultImg from './assets/person.png'
import eyeIcon from './assets/eye.png'

import './Contact.css'

const Contact = ({ contact, contacts, setContacts }) => {
  const api = "http://localhost:2022";
  const showContactImg = contact.imgURL ? api + contact.imgURL : defaultImg

  return (
    <li className="contact">

      <div className="contact-info-container">

        <div className="contact-avatar-container">
          <div className="show-image-wrapper">
            <img
              className="eye-icon"
              src={eyeIcon}
              alt="eye icon"
            ></img>
          </div>
          <img
            className="contact-avatar-img"
            src={showContactImg}
            alt="contact avatar"
          ></img>
        </div>

        <div className="contact-about-container">
          <span className="contact-name">{contact.name}</span>
          <span className="contact-handle">@{contact.handle}</span>
          <span className="contact-country-code">
            {contact.phoneNumberInfo?.countryCode}
          </span>
          <span className="contact-intNumber">
            {contact.phoneNumberInfo?.internationalNumber}
          </span>
        </div>

      </div>

      <span className="contact-about-line-break"></span>

      <div className="contact-item-btns-container">
        <a href={`tel:${contact.phoneNumberInfo.internationalNumber}`} className="call-contact"></a>
        <CustomLink
          URL={`/contacts/${contact._id}/update`}
          text="Update Contact"
          className="update-link"
        />
      </div>

      <DeleteContact
        contactID={contact._id}
        contacts={contacts}
        setContacts={setContacts}
      />
    </li>
  );
};

export default Contact;
