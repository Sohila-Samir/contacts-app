import ListContacts from "../../components/ListContacts/ListContacts"
import Header from "../../components/Header/Header"
import NoContacts from '../errors/NoContacts/NoContacts'
import Heading from "../../components/Main/Heading/Heading"

import './Home.css'
import { Fragment } from "react"

const Home = ({
  query,
  contactsToShow,
  contacts,
  onSetQuery,
  setContacts,
  onSetQueriedContacts,
}) => {
  return (
    <Fragment>
      <Header
        query={query}
        contacts={contacts}
        onSetQueriedContacts={onSetQueriedContacts}
        onSetQuery={onSetQuery}
      />
      <main>
        {
          !contactsToShow.length
          ? <NoContacts />
          : <Heading text="Current Contacts"/>
        }

        <ListContacts
          contactsToShow={contactsToShow}
          contacts={contacts}
          setContacts={setContacts}
          onSetQueriedContacts={onSetQueriedContacts}
        />
      </main>
    </Fragment>
  )

}

export default Home