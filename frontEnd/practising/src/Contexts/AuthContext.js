import { useState, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [authData, setAuthData] = useState({
		user: "",
		roles: [],
		accessToken: "",
		verified: false,
	});

	const handleAuthData = newAuthData => {
		setAuthData(prevState => ({ ...prevState, ...newAuthData }));
	};

	return (
		<AuthContext.Provider value={{ authData, handleAuthData }}>{children}</AuthContext.Provider>
	);
};

export default AuthContext;

/*
	{-------------------	PERSISTENT LOGIN SCENARIO	------------------------}
	-> user logs in with persist checked
	-> local storage store a persist with its value set to true
	-> user access a protected route
	-> protected route check if there's an aT stored
	-> if yes then display the page
	-> if no then request a new aT using refresh endpoint then
	-> refresh endpoint will go request a new credentials including aT and set it in the auth state
	-> after calling refresh endpoint loading state will be set to false
	-> user will be allowed again
	+ if user refreshed the page while persistent is still active. the cycle will be repeated

	{-------------------	NORMAL LOGIN SCENARIO	------------------------}
	-> user logs in with persistent unchecked
	-> user access a protected route
	-> protected component will check if aT exists
	-> if yes user will be allowed to view the page
	-> if no user will get booted back to login page

*/
