import { useEffect, useState } from "react";
import { deleteContact }from '../utils/endpoints'

const DeleteContactBtn = ({ contactID, onSetContacts, onSetQueriedContacts }) => {
  const [isWantToDelete, setIsWantToDelete] = useState(false);

  useEffect(() => {
    if (isWantToDelete) {
      const requestDeleteContact = async () => {
        await deleteContact(contactID);
        onSetContacts(mainContacts => mainContacts.filter((MContact) => MContact._id !== contactID));
        onSetQueriedContacts(queriedContacts => queriedContacts.filter((QContact) => QContact._id !== contactID));
      };
      requestDeleteContact();
    }
  }, [isWantToDelete]);

  return <button className='delete-contact-btn btn secondary' onClick={(e) => setIsWantToDelete(true)}>Delete Contact</button>;
};

export default DeleteContactBtn;