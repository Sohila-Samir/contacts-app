import { refreshToken } from "../axios/api-endpoints/auth-endpoints";
import useAuth from "./useAuth";

const useRefreshToken = () => {
	const { handleAuthData } = useAuth();
	const controller = new AbortController();

	const refresh = async () => {
		try {
			const newAuthData = await refreshToken(controller.signal);

			if (newAuthData.accessToken) {
				handleAuthData(newAuthData);
			}

			return newAuthData;
		} catch (err) {
			console.log("refresh hook call error: ", err);
		}
	};
	return refresh;
};

export default useRefreshToken;
