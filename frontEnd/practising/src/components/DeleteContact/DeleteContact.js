import { useEffect, useState } from "react";

import Button from "../Main/Button/Button";
import { deleteContact }from './../../utils/endpoints'

const DeleteContact = ({ contactID, contacts, setContacts, onSetQueriedContacts }) => {
  const [isWantToDelete, setIsWantToDelete] = useState(false);

  useEffect(() => {
    if (isWantToDelete) {
      const requestDeleteContact = async () => {
        await deleteContact(contactID);
        setContacts(contacts.filter((MContact) => MContact._id !== contactID));
        onSetQueriedContacts(queriedContacts => queriedContacts.filter((QContact) => QContact._id !== contactID));
      };
      requestDeleteContact();
    }
  }, [isWantToDelete]);

  const handleFunction = (e) => {
    setIsWantToDelete(true)
  }

  return <Button handleFunction={handleFunction} text="Delete Contact"/>
};

export default DeleteContact;