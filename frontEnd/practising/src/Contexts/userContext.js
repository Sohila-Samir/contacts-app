import { createContext, useReducer } from "react";
import { INITIAL_STATE, userReducer } from "../Reducers/userReducer";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

	return <UserContext.Provider value={{ user: state, dispatch }}>{children}</UserContext.Provider>;
};

export default UserContext;
