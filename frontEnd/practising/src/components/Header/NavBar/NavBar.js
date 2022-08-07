import { Fragment } from "react"

import SearchContact from "./SearchContact/SearchContact"

import './NavBar.css'

const NavBar = ({ query, contacts, onSetQueriedContacts, onSetQuery }) => {
  // const [navLinks, setNavLinks] = useState(['link1', 'link2', 'link3'])

  return(
    <nav>
      {/* <div>
        <span>Logo</span>
        <ul>
          {
            navLinks.map(navLink =>
              <li className="nav-link-item"><a href="#">{navLink}</a></li>
            )
          }
        </ul>
      </div> */}
      <Fragment>
        <SearchContact
          query={query}
          contacts={contacts}
          onSetQueriedContacts={onSetQueriedContacts}
          onSetQuery={onSetQuery}
        />
      </Fragment>
    </nav>
  )
}

export default NavBar