import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContactForm from "../../components/ContactForm/ContactForm";
import NotFound from "../errors/NotFound/NotFound";

import {
  getContact,
  updateContact,
} from "../../axios/api-endpoints/Contact-endpoints";

import ContactFormContext from "../../Contexts/ContactFormContext";

import usePrivateInstance from "../../hooks/usePrivateInstance";
const UpdateContact = () => {
  const [contactError, setContactError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const privateInstance = usePrivateInstance();
  const { formData, dispatch } = useContext(ContactFormContext);

  useEffect(() => {
    const requestContact = async () => {
      const res = await getContact(privateInstance, id);
      if (!res) setContactError(true);
      if (res) dispatch({ type: "UPDATE_CURRENT_STATE", payload: res });
    };

    requestContact();
  }, []);

  const submitFunction = async (privateInstance, signal, submitData) => {
    const res = await updateContact(privateInstance, submitData, signal);

    if (res) {
      navigate("/contacts");
    }
  };

  return (
    <>
      {contactError ? (
        <NotFound />
      ) : (
        <div className="contact-form-container">
          <ContactForm
            submitFunction={submitFunction}
            dataToUse={formData}
            dataDispatchFunction={dispatch}
          />
        </div>
      )}
    </>
  );
};

export default UpdateContact;
