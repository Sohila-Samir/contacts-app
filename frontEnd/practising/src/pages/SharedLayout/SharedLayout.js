import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import NavBar from "../../components/Header/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const SharedLayout = ({ query, contacts, onSetQueriedContacts, onSetQuery }) => {
  return (
    <Fragment>
      <NavBar
        query={query}
        contacts={contacts}
        onSetQueriedContacts={onSetQueriedContacts}
        onSetQuery={onSetQuery}
      />
      <Outlet/>

      <Footer/>
    </Fragment>
  );
}

export default SharedLayout;