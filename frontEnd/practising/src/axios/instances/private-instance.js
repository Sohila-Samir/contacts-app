import axios from "axios";

const privateInstance = axios.create();

privateInstance.defaults.baseURL = "http://localhost:2022/api";
privateInstance.defaults.headers.withCredentials = true;

export default privateInstance;
