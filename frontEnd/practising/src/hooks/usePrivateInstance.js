import { useEffect } from "react";

import jwtDecode from "jwt-decode";
import privateInstance from "../axios/instances/private-instance";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const usePrivateInstance = () => {
	const { authData } = useAuth();
	const refresh = useRefreshToken();

	const refreshAndAttachHeader = async config => {
		try {
			const newAuthData = await refresh();
			config.headers["Authorization"] = `bearer ${newAuthData?.accessToken}`;
			return config;
		} catch (err) {
			console.log("refresh error: ", err);
		}
	};

	useEffect(() => {
		const requestInterceptor = privateInstance.interceptors.request.use(
			async config => {
				if (!authData?.accessToken) {
					await refreshAndAttachHeader(config);

					return config;
				}
				const decoded = jwtDecode(authData?.accessToken);

				const currentDate = new Date();

				if (currentDate >= decoded?.exp * 1000) {
					await refreshAndAttachHeader(config);

					return config;
				}

				config.headers["Authorization"] = `bearer ${authData?.accessToken}`;
				return config;
			},
			err => {
				Promise.reject(err).catch(err => console.log(err));
			}
		);

		return () => {
			privateInstance.interceptors.request.eject(requestInterceptor);
		};
	}, [authData?.user, authData?.accessToken]);

	return privateInstance;
};

export default usePrivateInstance;

// { request interceptor scenearios }
// ------------------------------------
// user logs in :
//    - upon successful log in, set the auth data to the returned data from the response
//    - set the user id in local storage for persistent logginh mechanism
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
