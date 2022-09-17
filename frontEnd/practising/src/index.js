import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App/App";

import { ContactsProvider } from "./Contexts/ContactsContext";
import { AuthProvider } from "./Contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<AuthProvider>
		<ContactsProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ContactsProvider>
	</AuthProvider>
);
