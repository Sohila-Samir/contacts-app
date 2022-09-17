import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const Admin = () => {
	const { authData } = useAuth();
	useEffect(() => {
		console.log("admin mounted");
		console.log("auth data after mounting admin page", authData);
		return () => {
			console.log("admin unmounted");
			console.log("auth data after unmounting admin page", authData);
		};
	});
	return <h1>Admin Page</h1>;
};

export default Admin;
