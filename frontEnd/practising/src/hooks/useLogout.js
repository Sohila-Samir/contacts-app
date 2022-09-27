import { logout } from "../axios/api-endpoints/auth-endpoints";

import useAuth from "./useAuth";
import usePrivateInstance from "./usePrivateInstance";

const useLogout = () => {
  const { handleAuthData } = useAuth();
  const privateInstance = usePrivateInstance();

  const requestLogout = async () => {
    try {
      const controller = new AbortController();

      await logout(privateInstance, controller.signal);

      // localStorage.removeItem("persist");

      handleAuthData({ user: "", roles: [], accessToken: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return requestLogout;
};

export default useLogout;
