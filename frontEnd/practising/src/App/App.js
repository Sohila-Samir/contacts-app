import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { ContactFormProvider } from "../Contexts/ContactFormContext";

import AuthRole from "../layouts/AuthRole/AuthRole";
import ProtectedRoute from "../layouts/ProtectedRoute/ProtectedRoute";
import LoadingPage from "../pages/LoadingPage/LoadingPage";
import UnAuthorized from "./../pages/errors/UnAuthorized/UnAuthorized";

import ROLES from "./../utils/ROLES";

import "./App.css";

const Home = lazy(() => import("./../pages/Home/Home"));
const NotFound = lazy(() => import("../pages/errors/NotFound/NotFound"));
const AddContact = lazy(() => import("./../pages/AddContact/AddContact"));
const UpdateContact = lazy(() =>
  import("./../pages/UpdateContact/UpdateContact")
);
const Contacts = lazy(() => import("../pages/Contacts/Contacts"));
const ForgotPassword = lazy(() =>
  import("../components/ForgotPassword/ForgotPassword")
);
const SharedLayout = lazy(() => import("../layouts/SharedLayout/SharedLayout"));
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
          <Route element={<SharedLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
