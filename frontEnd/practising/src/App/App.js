import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, Suspense, lazy } from "react"

import LoadingPage from '../components/LoadingPage/LoadingPage'
import { getContacts } from './../utils/endpoints'

import './App.css'

const Home = lazy(() => import ("./../pages/Home/Home"))
const NotFound = lazy(() => import ("../pages/errors/NotFound/NotFound"))
const AddContact = lazy(() => import ("./../components/AddContact/AddContact"))
const UpdateContact = lazy(() => import ("./../components/UpdateContact/UpdateContact"))
const Contacts = lazy(() => import ("../pages/Contacts/Contacts"))
const SharedLayout = lazy(() => import ("../pages/SharedLayout/SharedLayout"))
const ContactDetails = lazy(() => import ("./../components/ContactDetails/ContactDetails"))

function App() {
  const [contacts , setContacts] = useState([])

  useEffect(() => {
		const requestAllContacts = async () => {
			const res = await getContacts()
			!res.success
			? setContacts([])
			: setContacts(res.data)
		}
		requestAllContacts()
	}, [])

  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="App">
        <Routes>

          <Route
            path='/'
            element={
              <SharedLayout
                contacts={contacts}
              />
            }
          >

            <Route index element={<Home/>} />

            <Route
              path="/contacts"
              element={
                <Contacts
                  contacts={contacts}
                  setContacts={setContacts}
                />
              }
            />

            <Route
              path="/contacts/new"
              element={
                <AddContact
                  setContacts={setContacts} contacts={contacts} />
              }
            />

            <Route
              path="/contacts/:id"
              element={
                <ContactDetails setContacts={setContacts} contacts={contacts} />
              }
            />

            <Route
              path="/contacts/:id/update"
              element={
                <UpdateContact setContacts={setContacts} contacts={contacts} />
              }
            />

          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
