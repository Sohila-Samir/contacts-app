import axios from "axios";

const authInstance = axios.create({
	baseURL: "http://localhost:2022/api/auth/",
	withCredentials: true,
});

export default authInstance;
