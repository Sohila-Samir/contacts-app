import { Link, useNavigate, useParams } from "react-router-dom";

import { useState, useEffect } from "react";

import Heading from "./../Main/Heading/Heading";
import Button from "../Main/Button/Button";
import ImageInput from "./../ImageInput/ImageInput";
import PhoneNumber from "./../PhoneNumber/PhoneNumber";
import FormInput from "../Main/FormInput/FormInput";

import './ContactForm.css'

const ContactForm = ({ setContacts, contacts, formActionHandler, formHeadingText }) => {
  const navigate = useNavigate()
  const { id } =  useParams()
  const api = 'http://localhost:2022'

  const chooseDataToUse = () => {
    if (id) {
      return contacts.filter(contact => contact._id === id)[0]
    } else {
      return {
        name: "",
        handle: "",
        imgURL: "",
        phoneNumberInfo: {
          internationalNumber: "",
          nationalNumber: "",
          countryCode: "",
      },
      }
    }
  }
  const [isWantToSubmit, setIsWantToSubmit] = useState(false)
  const [dataToUse, setDataToUse] = useState(chooseDataToUse())

  useEffect(() => {
    if (isWantToSubmit && dataToUse.phoneNumberInfo) {
      const makeRequest = async () => {
        const res = await formActionHandler(dataToUse)
        return res
      }

      makeRequest()
      .then(newData => {
        if (newData.data) {
          const filterContacts = contacts.filter(contact => contact._id !== newData.data._id)
          setContacts([...filterContacts, newData.data])
          navigate('/contacts', { replace: true })
        }
      })
    } else {
      setIsWantToSubmit(false)
    }
  }, [isWantToSubmit])

  const onHandleDataToUseChange = (e) => {
    e.target.files
    ? setDataToUse(prevState => ({...prevState, [e.target.name]: e.target.files[0]}))
    : setDataToUse(prevState => ({...prevState, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsWantToSubmit(true)
  }

  return(
    <div className="contact-form-container">
      <Link className="close-contact-form " to="/contacts"></Link>

      <Heading text={formHeadingText}/>

      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="contact-form"
        action={`${api}/api/contacts/new`}
        method="post"
      >
        <ImageInput
          className="create-contact-avatar-input"
          dataToUse={dataToUse}
          onHandleDataToUseChange={onHandleDataToUseChange}
          setDataToUse={setDataToUse}
        />
        <div className="contact-form-details-container">
          <FormInput
            className="form-input-field"
            type="text"
            name="name"
            placeholder="Name"
            value={dataToUse?.name}
            onChangeHandlerFN={onHandleDataToUseChange}
            isRequired={true}
          />

          <FormInput
            className="form-input-field"
            type="text"
            name="handle"
            placeholder="Handle"
            value={dataToUse?.handle}
            onChangeHandlerFN={onHandleDataToUseChange}
            isRequired={true}
          />

          <PhoneNumber setDataToUse={setDataToUse} dataToUse={dataToUse} />

          <Button type="submit" text={formHeadingText} isSecondary={false} className="submit-contact-form-btn" />
        </div>
      </form>
    </div>
  );
}
export default ContactForm