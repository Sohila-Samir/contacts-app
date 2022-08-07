import DeleteContact from "./../DeleteContact/DeleteContact";
import Button from './../Main/Button/Button';

import './Contact.css'

const Contact = ({ contact, contacts, onSetQueriedContacts, setContacts }) => {
  const api = "http://localhost:2022";
  return (
    <li className="contact-list-item">
      <div className="contact-avatar-container">
        <img
          className="contact-avatar-img"
          src={`${api}${contact.avatarURL}`}
          alt="contact avatar"
        ></img>
      </div>

      <div className="contact-info-container">
        <span className="contact-name">{contact.name}</span>
        <span className="contact-handle">@{contact.handle}</span>
        <span className="contact-country-code">
          {contact.phoneNumberInfo?.countryCode}
        </span>
        <span className="contact-intNumber">
          {contact.phoneNumberInfo?.internationalNumber}
        </span>
      </div>

      <div className="contact-item-btns-container">
        <Button text="Update Contact" isLink={true} URL={`/contacts/${contact._id}/update`} />

        <DeleteContact
          contactID={contact._id}
          contacts={contacts}
          setContacts={setContacts}
          onSetQueriedContacts={onSetQueriedContacts}
        />
      </div>
    </li>
  );
};

export default Contact;
