import { Outlet } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

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
