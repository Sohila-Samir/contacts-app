import { useEffect, useRef } from 'react'
import { Link } from "react-router-dom"

const SearchContact = ({ query, contacts, onSetQueriedContacts, onSetQuery }) => {
  const searchContactInputRef = useRef(null)

  useEffect(() => {
    searchContactInputRef.current.focus()
  }, [])

  const updateQuery = (e) => {
    const { value } = e.target
    onSetQueriedContacts(contacts.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase())))
		onSetQuery(value)
	}

  const showAll = () => {
    onSetQuery('')
    onSetQueriedContacts('')
  }

  const queryResultContactsLength = query.length
  ? contacts.filter(contact => contact.name.toLowerCase().includes(query.toLowerCase())).length
  : contacts.length

  return (
    <div className="search-contact-box">

      <div className='search-contact-input-box'>
        <span className="search-contact-icon"></span>
        <input
          className='search-contact-input'
          placeholder='Search for a contact...'
          ref={searchContactInputRef}
          value={query}
          onChange={updateQuery}
        />
        <Link to="/contacts/new" className="add-contact-btn"></Link>
      </div>


      {
        query.length && contacts.length
        ? <div className='query-info-box'>
            <span>Showing {queryResultContactsLength} from {contacts.length}</span>
            <button className='show-all-contacts-btn' onClick={showAll}>Show All</button>
          </div>
        : ''
      }

    </div>
  )
}
export default SearchContact