import Header from "../../components/Header/Header"

import { Fragment } from "react"
import CustomLink from "../../components/Main/CustomLink/CustomLink"
import './Home.css'

const Home = () => {
  return (
    <Fragment>
      {/* <Header
        query={query}
        contacts={contacts}
        onSetQueriedContacts={onSetQueriedContacts}
        onSetQuery={onSetQuery}
      /> */}
      <CustomLink URL="/contacts" isSecondary={false} className="contacts-link" text="Show Contacts" custom={true} />
    </Fragment>
  )

}

export default Home