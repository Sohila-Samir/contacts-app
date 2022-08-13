import { useParams } from 'react-router-dom';

import './ContactDetails.css'

const ContactDetails = () => {
  const { id } = useParams()
  console.log(id);
  return ( <h1>contact details</h1> );
}

export default ContactDetails;