import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import LoadingPage from "../../pages/LoadingPage/LoadingPage";

import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

const ProtectedRoute = () => {
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useRefreshToken();
  const { authData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const checkPersistanceState = () => {
    const isPersist = localStorage.getItem("persist");
    return isPersist && isPersist === "$persistCode@74123698" ? true : false;
  };

  useEffect(() => {
    const verifyAccessToken = async () => {
      try {
        const newAuthData = await refresh();
        if (!newAuthData?.success)
          navigate("login", { replace: true, state: { from: location } });
      } catch (err) {
        console.log("protected route refreshToken error: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    !authData?.accessToken && !checkPersistanceState()
      ? navigate("login", { replace: true, state: { from: location } })
      : authData?.accessToken && !checkPersistanceState()
      ? setIsLoading(false)
      : !authData?.accessToken && checkPersistanceState()
      ? verifyAccessToken()
      : setIsLoading(false);
  }, []);

  return isLoading ? <LoadingPage /> : <Outlet />;
};

export default ProtectedRoute;
