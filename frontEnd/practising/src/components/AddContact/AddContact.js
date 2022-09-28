import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import ContactForm from "./../ContactForm/ContactForm";

import { createContact } from "../../axios/api-endpoints/Contact-endpoints";

import ContactFormContext from "../../Contexts/ContactFormContext";

import useContacts from "../../hooks/useContacts";

const AddContact = () => {
  const navigate = useNavigate();
  const { formData, dispatch } = useContext(ContactFormContext);
  const { dispatch: contactsDispatchFN } = useContacts();

  const submitFunction = async (privateInstance, signal, submitData) => {
    if (submitData) {
      const res = await createContact(privateInstance, submitData, signal);

      if (res) {
        console.log(res);

        contactsDispatchFN({ type: "ADD_CONTACT", payload: res });

        dispatch({ type: "RESET" });

        navigate("/contacts");
      } else {
        console.log("new fetch error: ", res.message);
      }
    }
  };

  return (
    <>
      <div className="contact-form-container">
        <Link className="close-contact-form " to="/contacts"></Link>

        <ContactForm
          submitFunction={submitFunction}
          dataToUse={formData}
          dataDispatchFunction={dispatch}
        />
      </div>
    </>
  );
};

export default AddContact;
