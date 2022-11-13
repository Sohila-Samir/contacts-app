import axios from "axios";
import authInstance from "../instances/auth-instance";

const api = "http://localhost:2022/api/";

export const login = async (data, signal) => {
  try {
    const res = await authInstance.post("login/local", data, { signal });
    console.log(res.data);
    return res.data;
  } catch (err) {
    if (!err.response.data.success) return err.response.data;
    console.log("login fetch error: ", err.response);
    return err;
  }
};

export const register = async (data, signal) => {
  try {
    const res = await authInstance.post(`${api}users/new`, data, { signal });
    console.log(res.data);
    return res.data;
  } catch (err) {
    if (!err.response.data.success) return err.response.data;
    console.log("register fetch error: ", err.response);
    return err;
  }
};

export const refreshToken = async (signal) => {
  try {
    const res = await authInstance.post(`/refresh-token`, null, { signal });
    console.log(
      "%crquesting new access token...",
      "background-color: yellow; color: black;"
    );
    return res.data;
  } catch (err) {
    if (!err.response.data.success) return err.response.data;
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
    if (!err.response.data.success) return err.response.data;
    console.log("logout fetch error: ", err.response);
    return err;
  }
};

export const sendResetPasswordEmail = async (signal, email) => {
  try {
    const res = await axios.post(
      `${api}auth/forgot-password`,
      { email },
      {
        signal,
      }
    );
    console.log("forgot password fetch result: ", res.data);
    return res.data;
  } catch (err) {
    if (!err.response.data.success) return err.response.data;
    console.log("forgot password fetch error: ", err.response);
    return err;
  }
};

export const resetPassword = async (signal, data, resetTkn) => {
  try {
    const res = await axios.post(
      `${api}auth/reset-password/${resetTkn}`,
      data,
      {
        signal,
      }
    );
    console.log("reset password fetch result: ", res.data);
    return res.data;
  } catch (err) {
    if (!err.response.data.success) return err.response.data;
    console.log("reset password fetch error: ", err.response);
    return err;
  }
};

export const loginWithGoogle = async (signal) => {
  try {
    const res = await authInstance.get(
      "http://localhost:2022/api/auth/google",
      { signal }
    );
    return res.data;
  } catch (err) {
    console.log("login with google request error: ", err);
  }
};
