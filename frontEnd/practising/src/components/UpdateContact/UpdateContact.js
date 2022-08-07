import ContactForm from './../ContactForm/ContactForm'

import { updateContact } from "./../../utils/endpoints";

const UpdateContact = ({ setContacts, contacts }) => {
  return (
    <ContactForm
      formHeadingText="Update Contact"
      formActionHandler={updateContact}
      contacts={contacts}
      setContacts={setContacts}
    />
  )
}

export default UpdateContact