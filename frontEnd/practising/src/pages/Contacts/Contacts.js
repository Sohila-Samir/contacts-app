import { useEffect } from "react";
import Contact from "../../components/Contact/Contact";
import CustomLink from "../../components/Main/CustomLink/CustomLink";
import Heading from "../../components/Main/Heading/Heading";
import NoContacts from "../errors/NoContacts/NoContacts";

import { getContacts } from "../../axios/api-endpoints/Contact-endpoints";

import usePrivateInstance from "../../hooks/usePrivateInstance";
import useContacts from "./../../hooks/useContacts";

import "./Contacts.css";

const Contacts = () => {
  const privateInstance = usePrivateInstance();
  const { contacts, dispatch } = useContacts();

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await getContacts(privateInstance);
      if (res) {
        console.log(res);
        dispatch({ type: "SET_CONTACTS", payload: res });
      }
    };

    fetchContacts();
  }, [dispatch, privateInstance]);

  return (
    <main>
      {!contacts?.length ? (
        <NoContacts />
      ) : (
        <>
          <Heading text="Current Contacts" />

          <ol className="contacts-list">
            {contacts?.map((contact) => (
              <Contact key={contact?._id} contact={contact} />
            ))}
          </ol>
        </>
      )}
      <CustomLink
        className="add-contact-link"
        URL="/contacts/new"
        text="+"
        custom={true}
      />
    </main>
  );
};

export default Contacts;

/*
  - user successfully registers
  - authData gets populated with the [accessToken, roles, userID, verified]
  - user gets redirected to home page or the page he was trying to access
  - i.e: user was redirected to Contacts page
    - contacts page renders initially and request the user contacts using accessToken (1)
    - server respond with user contacts
    - client populate the contacts array state
    - contacts page re-render (2)
      - suppose user went to another page and then headed back to the contacts page
      after accessToken has expired.
      - Contacts page will render again (1)
      - requests the new contacts
      - private instance detects expired accessToken
      - private instance requests new accessToken
      - server respond with new auth credentials
      - private instance re-populate the authData state
      - Contacts Page re-render
 */
