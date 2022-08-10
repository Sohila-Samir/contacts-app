import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import NavBar from "../../components/Header/NavBar/NavBar";

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
    </Fragment>
  );
}

export default SharedLayout;