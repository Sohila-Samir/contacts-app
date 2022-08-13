import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

import CustomLink from './../Main/CustomLink/CustomLink'

import './SearchContact.css'

const SearchContact = ({ contacts }) => {
  const [queriedContacts, setQueriedContacts] = useState([])
	const [query, setQuery] = useState('')


  const updateQuery = (e) => {
    const { value } = e.target
		setQuery(value)
    setQueriedContacts(contacts.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase())))
	}

  const focus = (e) => {
    document.querySelector('nav').classList.add('blur-content')
  }

  const blur = (e) => {
    document.querySelector('nav').classList.remove('blur-content')
  }

  return (
    <div className="search-contact-box">

      <input
        type="search"
        className='search-contact-input'
        placeholder='Search for a contact...'
        value={query}
        onChange={updateQuery}
        onFocus={focus}
        onBlur={blur}
      />

      {
        query.length && queriedContacts.length
        ?
          <div className='query-result-container'>
            <ul className='query-result-list'>
              {queriedContacts.map(contact =>
                <li key={contact._id}>
                  <CustomLink
                    className="query-contact-link"
                    isSecondary={false}
                    custom={true}
                    URL={`/contacts/${contact._id}`}
                    text={contact.name}
                  />
                </li>
              )}
            </ul>
          </div>
        : ''
      }

    </div>
  )
}
export default SearchContact