import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const AuthRole = ({ roles }) => {
  const { authData } = useAuth();
  const location = useLocation();

  return authData?.roles?.find((role) => roles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace={true} />
  );
};

export default AuthRole;
