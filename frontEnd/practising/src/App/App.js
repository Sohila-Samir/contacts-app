import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import { ContactFormProvider } from "../Contexts/ContactFormContext";

import LoadingPage from "../pages/LoadingPage/LoadingPage";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AuthRole from "../components/AuthRole/AuthRole";
import UnAuthorized from "./../pages/errors/UnAuthorized/UnAuthorized";

import usePrivateInstance from "../hooks/usePrivateInstance";
import useContacts from "../hooks/useContacts";
import useAuth from "../hooks/useAuth";
import ROLES from "./../utils/ROLES";
import { getContacts } from "../axios/api-endpoints/Contact-endpoints";

import "./App.css";

const Home = lazy(() => import("./../pages/Home/Home"));
const NotFound = lazy(() => import("../pages/errors/NotFound/NotFound"));
const AddContact = lazy(() => import("./../components/AddContact/AddContact"));
const UpdateContact = lazy(() => import("./../components/UpdateContact/UpdateContact"));
const Contacts = lazy(() => import("../pages/Contacts/Contacts"));
const SharedLayout = lazy(() => import("../pages/SharedLayout/SharedLayout"));
const ContactDetails = lazy(() => import("./../pages/ContactDetails/ContactDetails"));
const Login = lazy(() => import("./../pages/Login/Login"));
const Register = lazy(() => import("./../pages/Register/Register"));
const Admin = lazy(() => import("./../pages/Admin/Admin"));

if (process.env.NODE_ENV === "production") {
	disableReactDevTools();
}

function App() {
	const { authData } = useAuth();
	const privateInstance = usePrivateInstance();
	const { dispatch } = useContacts();

	const fetchContacts = async signal => {
		const res = await getContacts(privateInstance, signal);
		if (res) {
			dispatch({ type: "SET_CONTACTS", payload: res });
		}
	};

	useEffect(() => {
		const controller = new AbortController();

		if (authData?.accessToken) {
			fetchContacts(controller.signal);
		}

		return () => {
			controller.abort();
		};
	}, [authData?.accessToken]);

	console.log("App re-rendered");
	return (
		<Suspense fallback={<LoadingPage />}>
			<div className="App">
				<Routes>
					<Route path="/" element={<SharedLayout />}>
						<Route index element={<Home />} />

						<Route element={<ProtectedRoute />}>
							<Route element={<AuthRole roles={[ROLES.USER, ROLES.ADMIN]} />}>
								<Route path="/contacts" element={<Contacts />} />

								<Route
									path="/contacts/new"
									element={
										<ContactFormProvider>
											<AddContact />
										</ContactFormProvider>
									}
								/>

								<Route
									path="/contacts/:id/update"
									element={
										<ContactFormProvider>
											<UpdateContact />
										</ContactFormProvider>
									}
								/>

								<Route path="/contacts/:id" element={<ContactDetails />} />
							</Route>

							<Route element={<AuthRole roles={[ROLES.ADMIN]} />}>
								<Route path="/admin/dashboard" exact element={<Admin />} />
							</Route>

							<Route path="/unauthorized" exact element={<UnAuthorized />} />
						</Route>
					</Route>

					<Route path="/login" exact element={<Login />} />

					<Route path="/register" exact element={<Register />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</Suspense>
	);
}

export default App;
