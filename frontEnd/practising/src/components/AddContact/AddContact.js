import ContactForm from './../ContactForm/ContactForm'
import { createContact } from './../../utils/endpoints'

const AddContact = ({ setContacts, contacts }) => {
  return (
    <ContactForm
      formHeadingText="Add Contact"
      formActionHandler={createContact}
      setContacts={setContacts}
      contacts={contacts}
    />
  )
}

export default AddContact