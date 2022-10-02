import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import ContactForm from "../../components/ContactForm/ContactForm";

import { createContact } from "../../axios/api-endpoints/Contact-endpoints";

import ContactFormContext from "../../Contexts/ContactFormContext";

const AddContact = () => {
  const navigate = useNavigate();
  const { formData, dispatch } = useContext(ContactFormContext);

  const submitFunction = async (privateInstance, signal, submitData) => {
    if (submitData) {
      const res = await createContact(privateInstance, submitData, signal);

      if (res) {
        console.log(res);

        dispatch({ type: "RESET" });

        navigate("/contacts");
      }
    }
  };

  return (
    <>
      <div className="contact-form-container">
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
