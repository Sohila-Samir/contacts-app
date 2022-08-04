import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from "react"

import Home from './pages/Home'
import NotFound from "./pages/errors/404"
import AddContact from "./components/AddContact"
import UpdateContact from "./components/UpdateContact"
import { getContacts } from './utils/endpoints'

function App() {
  const [contacts , setContacts] = useState([])
  const [queriedContacts, setQueriedContacts] = useState([])
	const [query, setQuery] = useState('')

  useEffect(() => {
		const requestAllContacts = async () => {
			const res = await getContacts()
			res.length
			? setContacts(res)
			: setContacts([])
		}
		requestAllContacts()
	}, [])

  const onSetContacts = (newContacts) => {
		setContacts(prevState => ([...prevState, {...newContacts}]))
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
              onSetContacts={onSetContacts}
              onSetQueriedContacts={onSetQueriedContacts}
            />
          }
        />
        <Route
          exact
          path="/contacts/new"
          element={
            <AddContact onSetContacts={onSetContacts} />
          }
        />

        <Route
          exact
          path="/contacts/:id/update"
          element={
            <UpdateContact />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
