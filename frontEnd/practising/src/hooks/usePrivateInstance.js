import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import privateInstance from "../axios/instances/private-instance";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const usePrivateInstance = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { authData } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    // request interceptor
    const requestInterceptor = privateInstance.interceptors.request.use(
      async (config) => {
        if (!config.headers["Authorization"] && authData?.accessToken) {
          console.log("request header has been set!");

          config.headers["Authorization"] = `bearer ${authData?.accessToken}`;

          console.log("request header: ", config.headers["Authorization"]);
        }
        return config;
      },
      (err) => {
        Promise.reject(err).catch((err) =>
          console.log("request interceptor error: ", err)
        );
      }
    );

    // response interceptor
    const responseInterceptor = privateInstance.interceptors.response.use(
      (config) => config,
      async (err) => {
        const prevRequest = err?.config;

        if (err?.response?.status === 403 && !prevRequest?.sent) {
          console.log(
            "expired access token! - resending request one more time..."
          );

          prevRequest.sent = true;

          const newAuthData = await refresh();

          console.log("new auth data: ", newAuthData);

          if (newAuthData?.data?.accessToken) {
            console.log("condition ran successfully");

            prevRequest.headers[
              "Authorization"
            ] = `bearer ${newAuthData.data.accessToken}`;

            console.log(
              "new header token has been set: ",
              prevRequest.headers["Authorization"]
            );

            return privateInstance(prevRequest);
          }
        }
        Promise.reject(err).catch((err) =>
          console.log("response interceptor error: ", err)
        );
      }
    );

    return () => {
      privateInstance.interceptors.request.eject(requestInterceptor);
      privateInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [authData?.accessToken, location, navigate]);

  return privateInstance;
};

export default usePrivateInstance;

// { request interceptor scenarios }
// ------------------------------------
// user logs in :
//    - upon successful log in, set the auth data to the returned data from the response
//    - set the user id in local storage for persistent logging mechanism
//    * upon failure //TODO

// user access a protected route:
//    - if user id exists in localStorage, allow user to access the resource
//    * else, redirect to "/login"

// user is allowed to access the route AND is making a request to private resource:
//    + if user is seeing the page, then this means that user is logged in. { userId and RefreshToken avaliable }.
//    + if user refresh the page before attempting to make the request, access token will be gone.
//    - if no access token, request a new one using the refresh token and store the new one in memmory.
//    + repeat the cycle if user refreshs the page.
//    - if user didn't refresh the page then decode the current accessToken and check it's expiration date
//    - if expired request a new one and attach it to the header
//    * if not continue the process and send the response
