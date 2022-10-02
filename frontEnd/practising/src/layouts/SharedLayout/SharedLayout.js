import { Outlet } from "react-router-dom";

import Footer from "../../layouts/Footer/Footer";
import NavBar from "../../layouts/NavBar/NavBar";

const SharedLayout = () => {
  return (
    <>
      <NavBar />

      <Outlet />

      <Footer />
    </>
  );
};

export default SharedLayout;
