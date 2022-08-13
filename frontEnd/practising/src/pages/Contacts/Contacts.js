import ListContacts from "../../components/ListContacts/ListContacts";
import NoContacts from "../errors/NoContacts/NoContacts";
import Heading from "../../components/Main/Heading/Heading";

import './Contacts.css'

const Contacts = ({ contacts, setContacts }) => {
  return (
    <main>
        {
          !contacts.length
          ? <NoContacts />
          : <Heading text="Current Contacts"/>
        }

        <ListContacts
          contacts={contacts}
          setContacts={setContacts}
        />
    </main>
  );
}

export default Contacts;