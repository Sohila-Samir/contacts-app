import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from "react"

import Home from './../pages/Home/Home'
import NotFound from "../pages/errors/NotFound/NotFound"
import AddContact from "./../components/AddContact/AddContact"
import UpdateContact from "./../components/UpdateContact/UpdateContact"
import { getContacts } from './../utils/endpoints'

import './App.css'

function App() {
  const [contacts , setContacts] = useState([])
  const [queriedContacts, setQueriedContacts] = useState([])
	const [query, setQuery] = useState('')

  useEffect(() => {
		const requestAllContacts = async () => {
			const res = await getContacts()
			!res.success
			? setContacts([])
			: setContacts(res.data)
		}
		requestAllContacts()
    return () => {
      return contacts
    }
	}, [])

  const onSetContacts = (newContacts) => {
		setContacts(prevState => ([...prevState, newContacts]))
	}

  const onSetQueriedContacts = (newQueriedContacts) => {
    setQueriedContacts(newQueriedContacts)
  }

  const onSetQuery = (newQuery) => {
    setQuery(newQuery)
  }

  const contactsToShow =
  query && queriedContacts.length ? queriedContacts :
  query && !queriedContacts.length ? [] :
  contacts

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              query={query}
              contactsToShow={contactsToShow}
              contacts={contacts}
              onSetQuery={onSetQuery}
              setContacts={setContacts}
              onSetQueriedContacts={onSetQueriedContacts}
            />
          }
        />

        <Route
          exact
          path="/contacts/new"
          element={
            <AddContact
              setContacts={setContacts} contacts={contacts} />
          }
        />

        <Route
          path="/contacts/:id/update"
          element={
            <UpdateContact setContacts={setContacts} contacts={contacts} />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
