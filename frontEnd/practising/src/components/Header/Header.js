import NavBar from './NavBar/NavBar'

import './Header.css'

const Header = ({ query, contacts, onSetQueriedContacts, onSetQuery }) => {
  return (
    <header>
      <NavBar
        query={query}
        contacts={contacts}
        onSetQueriedContacts={onSetQueriedContacts}
        onSetQuery={onSetQuery}
      />
    </header>
  )
}

export default Header