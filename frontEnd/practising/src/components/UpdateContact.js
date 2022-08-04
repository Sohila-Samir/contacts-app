import { Link } from "react-router-dom"

const UpdateContact = ({ contactID }) => {
  return (
    <Link
      to={`/contacts/${contactID}/update`}
      className='update-contact-btn btn secondary'
    >Update Contact</Link>
  )
}

export default UpdateContact