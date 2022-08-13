import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const SharedLayout = ({ contacts }) => {
  return (
    <Fragment>
      <NavBar
        contacts={contacts}
      />
      <Outlet/>

      <Footer/>
    </Fragment>
  );
}

export default SharedLayout;