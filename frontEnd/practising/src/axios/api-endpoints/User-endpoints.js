import axios from "axios";

const usersApi = "/users";

export const getUser = async (instance, id, signal) => {
	try {
		const res = await instance.get(`${usersApi}/${id}`, {
			signal,
		});
		return res.data.data;
	} catch (err) {
		console.log("get user request error", err.response);
	}
};

export const deleteUser = async (instance, id, signal) => {
	try {
		const res = await instance.delete(`${usersApi}/${id}/delete`, {
			signal,
		});
		return res.data.data;
	} catch (err) {
		console.log("delete user request error", err.response);
	}
};

export const updateUser = async (instance, data, signal) => {
	try {
		const res = await instance.put(`${usersApi}/${data._id}/update`, data, {
			signal,
		});
		return res.data.data;
	} catch (err) {
		console.log("update user request error", err.message);
	}
};

export const checkUserExistence = async (username, signal) => {
	try {
		const res = await axios.get(`http://localhost:2022/api${usersApi}/exist`, {
			signal,
			params: {
				user: username,
			},
		});
		console.log(res.data.message);
		return res.data.message;
	} catch (err) {
		console.log("checking user existence request error: ", err.message);
	}
};

export const sendUserVerifyEmail = async (userID, userEmail, signal) => {
	try {
		const res = await axios.post(
			`http://localhost:2022/api/send_verify_email`,
			{ id: userID, email: userEmail },
			{
				signal,
			}
		);
		console.log(res.data.message);
		return res.data.success;
	} catch (err) {
		console.log("send user verify email request error: ", err.message);
	}
};
