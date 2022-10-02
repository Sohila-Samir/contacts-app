import { useLocation, useNavigate } from "react-router-dom";
import { refreshToken } from "../axios/api-endpoints/auth-endpoints";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const controller = new AbortController();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleAuthData } = useAuth();

  const refresh = async () => {
    try {
      const newAuthData = await refreshToken(controller.signal);

      if (newAuthData?.data?.accessToken) {
        handleAuthData(newAuthData?.data);
        return newAuthData;
      }
      handleAuthData({ accessToken: "", roles: [], verified: "", user: "" });
      navigate("/login", { replace: true, state: { from: location } });
    } catch (err) {
      Promise.reject(err).catch((err) =>
        console.log("refresh hook call error: ", err)
      );
    }
  };
  return refresh;
};

export default useRefreshToken;
