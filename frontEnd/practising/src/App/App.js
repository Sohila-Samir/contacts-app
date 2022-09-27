import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { ContactFormProvider } from "../Contexts/ContactFormContext";

import AuthRole from "../components/AuthRole/AuthRole";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import LoadingPage from "../pages/LoadingPage/LoadingPage";
import UnAuthorized from "./../pages/errors/UnAuthorized/UnAuthorized";

import { getContacts } from "../axios/api-endpoints/Contact-endpoints";
import useAuth from "../hooks/useAuth";
import useContacts from "../hooks/useContacts";
import usePrivateInstance from "../hooks/usePrivateInstance";
import ROLES from "./../utils/ROLES";

import "./App.css";

const Home = lazy(() => import("./../pages/Home/Home"));
const NotFound = lazy(() => import("../pages/errors/NotFound/NotFound"));
const AddContact = lazy(() => import("./../components/AddContact/AddContact"));
const UpdateContact = lazy(() =>
  import("./../components/UpdateContact/UpdateContact")
);
const Contacts = lazy(() => import("../pages/Contacts/Contacts"));
const ForgotPassword = lazy(() =>
  import("../components/ForgotPassword/ForgotPassword")
);
const SharedLayout = lazy(() => import("../pages/SharedLayout/SharedLayout"));
const ContactDetails = lazy(() =>
  import("./../pages/ContactDetails/ContactDetails")
);
const Login = lazy(() => import("./../pages/Login/Login"));
const Register = lazy(() => import("./../pages/Register/Register"));
const Admin = lazy(() => import("./../pages/Admin/Admin"));
const ResetPasswordForm = lazy(() =>
  import("./../pages/ResetPasswordForm/ResetPasswordForm")
);

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

function App() {
  const { authData } = useAuth();
  const privateInstance = usePrivateInstance();
  const { dispatch } = useContacts();

  const fetchContacts = async (signal) => {
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

          <Route path="/forgot-password" exact element={<ForgotPassword />} />

          <Route
            path="/reset-password/:token"
            exact
            element={<ResetPasswordForm />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
