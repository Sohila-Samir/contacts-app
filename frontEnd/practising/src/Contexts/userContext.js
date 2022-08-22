import { createContext, useState } from "react";

const userContext = createContext({});

export const userContextProvider = ({ children }) => {
	const [user, setUser] = useState();

	const updateUser = newUser => {
		return setUser(prevState => ({ ...prevState, ...newUser }));
	};

	<userContext.Provider value={{ user, updateUser }}>{children}</userContext.Provider>;
};

export default userContext;
