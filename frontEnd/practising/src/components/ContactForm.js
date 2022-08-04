import { Link } from "react-router-dom";
import Heading from "./Heading";
import ImageInput from "./ImageInput";
import PhoneNumber from "./PhoneNumber";

const ContactForm = () => {
  return(
    <div className="add-contact-container">
      <Link className="close-create-contact" to="/"></Link>

      <Heading text="Update Contact"/>

      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="create-contact-form"
        action={`${api}/api/contacts/new`}
        method="post"
      >
        <ImageInput
          className="create-contact-avatar-input"
          onHandleInputChange={handleInputChange}
          setFormInputs={setFormInputs}
        />

        <div className="create-contact-details">
          <input
            className="add-contact-form-field"
            type="text"
            name="name"
            placeholder="Name"
            value={formInputs.name}
            onChange={handleInputChange}
            required={true}
          />
          <input
            className="add-contact-form-field"
            type="text"
            name="handle"
            placeholder="Handle"
            value={formInputs.handle}
            onChange={handleInputChange}
            required={true}
          />

          <PhoneNumber setFormInputs={setFormInputs}/>

          <button
            className="add-contact-submit-btn btn main"
            type="submit"
          >Update Contact</button>
        </div>
      </form>
    </div>
  );
}
export default ContactForm