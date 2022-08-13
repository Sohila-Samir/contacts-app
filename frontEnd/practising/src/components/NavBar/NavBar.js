import { NavLink } from "react-router-dom"
import { useRef } from "react"

import Logo from "../Main/Logo/Logo"
import SearchContact from "../SearchContact/SearchContact"
import CustomLink from "./../Main/CustomLink/CustomLink"

import defaultUserImage from './assets/person.png'

import './NavBar.css'

const NavBar = ({ query, contacts, onSetQueriedContacts, onSetQuery }) => {
  const navLinksList = useRef(null)
  const userImageToShow = true  ? defaultUserImage : ""

  const toggleMenuBar = (e) =>  {
    navLinksList.current.classList.toggle('toggle-menuBar');
  }


  return(
    <nav>
      <div className="nav-div-1">

        <div className="nav-header">
          <Logo />
          <div className="burger-icon" onClick={toggleMenuBar}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className="navbar-links-list" ref={navLinksList}>
          <li>
            <NavLink
              className={isActive => isActive ? 'navLink active' : "navLink"}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={isActive => (isActive ? 'navLink active' : "navLink")}
              to="/contacts"
            >
              Contacts
            </NavLink>
          </li>
          <li>
            <NavLink
              className={isActive => (isActive ? 'navLink active' : "navLink")}
              to="/about"
            >
              About
            </NavLink>
          </li>
        </ul>

      </div>

      <div className="nav-div-2">
        <SearchContact
          query={query}
          contacts={contacts}
          onSetQueriedContacts={onSetQueriedContacts}
          onSetQuery={onSetQuery}
        />
        <li>
          <CustomLink
            className="add-contact-link"
            URL="/contacts/new"
            text="Add Contact"
          />
        </li>

        <div className="user-profile-btn-container">
          <img className="user-profile-img" src={userImageToShow} alt="user profile"></img>
          <CustomLink
            className="user-profile-link"
            URL="/users/user"
            isSecondary={false}
            custom={true}
          />
        </div>
      </div>
    </nav>
  )
}

export default NavBar