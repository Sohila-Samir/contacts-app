import ListContacts from "../../components/ListContacts/ListContacts";
import NoContacts from "../errors/NoContacts/NoContacts";
import Heading from "../../components/Main/Heading/Heading";

import './Contacts.css'

const Contacts = ({ contactsToShow, contacts, setContacts, onSetQueriedContacts }) => {
  return (
    <main>
        {
          !contactsToShow.length
          ? <NoContacts />
          : <Heading text="Current Contacts"/>
        }

        <ListContacts
          contactsToShow={contactsToShow}
          contacts={contacts}
          setContacts={setContacts}
          onSetQueriedContacts={onSetQueriedContacts}
        />
    </main>
  );
}

export default Contacts;