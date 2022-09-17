import authInstance from "../instances/auth-instance";

const api = "http://localhost:2022/api/";

export const login = async (data, signal) => {
	try {
		const res = await authInstance.post("login", data, { signal });
		console.log(res.data.data);
		return res.data.data;
	} catch (err) {
		console.log("login fetch error: ", err.response);
	}
};

export const register = async (data, signal) => {
	try {
		const res = await authInstance.post(`${api}users/new`, data, { signal });
		console.log(res.data.data);
		return res.data.data;
	} catch (err) {
		console.log("register fetch error: ", err.response);
	}
};

export const refreshToken = async signal => {
	try {
		const res = await authInstance.post(`/refresh-token`, null, { signal });
		console.log(res.data.data);
		return res.data.data;
	} catch (err) {
		console.log("refresh token fetch error: ", err.response);
		return err;
	}
};

export const logout = async (instance, signal) => {
	try {
		const res = await instance.post(`/auth/logout`, null, {
			signal,
		});
		console.log(res.data.message);
		return res.data.message;
	} catch (err) {
		console.log("logout fetch error: ", err.response);
		return err;
	}
};
