import ListContacts from "../components/ListContacts"
import Header from "../components/Header/Header"
import NoContacts from './errors/NoContacts'
import Heading from "../components/Heading"

import './../css/Home.css'
import './../css/ListContacts.css'
const Home = ({
  query,
  contactsToShow,
  contacts,
  onSetQuery,
  onSetContacts,
  onSetQueriedContacts,
}) => {
  return (
    <div className="contacts-app">
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
          onSetContacts={onSetContacts}
          onSetQueriedContacts={onSetQueriedContacts}
        />
      </main>
    </div>
  )

}

export default Home