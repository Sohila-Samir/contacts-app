import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'

import ImageInput from "./ImageInput"
import PhoneNumber from "./PhoneNumber"
import Heading from "./Heading"
import { createContact } from '../utils/endpoints'

import './../css/ListContacts.css'
import './../css/AddContact.css'

const AddContact = ({ onSetContacts }) => {
  const navigate = useNavigate()
  const api = 'http://localhost:2022'

  const [isWantToAddContact, setIsWantToAddContact] = useState(false)
  const [formInputs, setFormInputs] = useState({
    name: "",
    handle: "",
    avatarURL: "",
    phoneNumberInfo: {
			internationalNumber: "",
			nationalNumber: "",
			countryCode: "",
		},
  })

  useEffect(() => {
    if (isWantToAddContact && Object.values(formInputs.phoneNumberInfo)[0]) {
      const requestNewContact = async () => {
        const res = await createContact(formInputs)
        onSetContacts(res.data)
        return res
      }

      requestNewContact()
      .then(newContact => (
        newContact.data.avatarURL ? navigate('/') : console.log("loading...")
      ))
    } else {
      navigate('/contacts/new')
      setIsWantToAddContact(false)
    }
  }, [isWantToAddContact])


  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsWantToAddContact(true)
  }

  const handleInputChange = (e) => {
    e.target.files
    ? setFormInputs({...formInputs, [e.target.name]: e.target.files[0]})
    : setFormInputs({...formInputs, [e.target.name]: e.target.value})
  }

  return(
    <div className="add-contact-container">
      <Link className="close-create-contact" to="/"></Link>

      <Heading text="Add Contact"/>

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
          >Add Contact</button>
        </div>
      </form>
    </div>
  );
}

export default AddContact