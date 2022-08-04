import DeleteContactBtn from "./DeleteContactBtn";
import UpdateContact from './UpdateContact'

const Contact = ({ contact, onSetQueriedContacts, onSetContacts }) => {
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
        <DeleteContactBtn
          contactID={contact._id}
          onSetContacts={onSetContacts}
          onSetQueriedContacts={onSetQueriedContacts}
        />

        <UpdateContact />
      </div>
    </li>
  );
};

export default Contact;
