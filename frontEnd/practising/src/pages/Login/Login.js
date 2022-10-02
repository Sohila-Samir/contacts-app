import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PasswordLogic from "../../components/Main/PasswordLogic/PasswordLogic";
import Button from "./../../components/Main/Button/Button";
import CustomLink from "./../../components/Main/CustomLink/CustomLink";
import FormInput from "./../../components/Main/FormInput/FormInput";

import { login } from "../../axios/api-endpoints/auth-endpoints";
import useAuth from "../../hooks/useAuth";
import useDetectCapsLockState from "../../hooks/useDetectCapsLockState";

import "./Login.css";

const Login = () => {
  const { handleAuthData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [handleCapsLockState, CapsLockDetect] = useDetectCapsLockState();

  const from = location.state?.from?.pathname || "/";

  const [heading, setHeading] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFormHeading();
    checkPersistenceState();
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", handleCapsLockState);

    return () => {
      document.removeEventListener("keyup", handleCapsLockState);
    };
  }, [handleCapsLockState]);

  const matchPasswords = () => {
    const pwd = document.querySelector("#password");

    const confirmPwd = document.querySelector("#confirm-password");

    if (pwd.value !== confirmPwd.value) {
      confirmPwd.style.borderColor = "#ff0000";
      return false;
    }

    return true;
  };

  const setFormHeading = () => {
    if (from !== "/") {
      setHeading("You Need to Sign In to Visit This Page");
    } else {
      setHeading("Welcome");
    }
  };

  const handleFormData = (e) => {
    setLoginFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleIsTrustDevice = (e) => {
    e.target.checked
      ? localStorage.setItem("persist", "$persistCode@74123698")
      : localStorage.removeItem("persist");
  };

  const checkPersistenceState = () => {
    const isPersist = localStorage.getItem("persist");
    const isTrustDevice = document.querySelector("#trustDevice");
    isPersist
      ? (isTrustDevice.checked = true)
      : (isTrustDevice.checked = false);
  };

  const requestLogin = async (signal) => {
    const res = await login(loginFormData, signal);

    if (!res.success) setErrorMessage(res.message);

    const trustDeviceBtn = document.querySelector(".trustDevice");

    if (res?.data?.accessToken) {
      trustDeviceBtn.checked
        ? localStorage.setItem("persist", "$persistCode@74123698")
        : localStorage.removeItem("persist");

      handleAuthData(res.data);

      navigate(from, { replace: true });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (matchPasswords()) {
      const controller = new AbortController();
      requestLogin(controller.signal);
    }
  };

  return (
    <>
      <section className="login-container">
        <form action="" onSubmit={handleSubmit} className="login-form">
          <h2>{heading}</h2>
          <FormInput
            id="email"
            className="email-input-field"
            type="email"
            name="email"
            value={loginFormData?.email}
            isRequired={true}
            onChangeHandlerFN={handleFormData}
          />
          <PasswordLogic
            dataToUse={loginFormData}
            handleFormData={handleFormData}
          />
          {errorMessage ? <p className="error-message">{errorMessage}</p> : ""}

          {CapsLockDetect}

          <a
            href="http://localhost:3000/forgot-password"
            className="forgot-password-link"
          >
            Forgot Password?
          </a>
          <div className="trustDevice-container">
            <input
              id="trustDevice"
              type="checkbox"
              className="trustDevice"
              onChange={toggleIsTrustDevice}
            />
            <label htmlFor="trustDevice">Trust this device?</label>
          </div>
          <Button
            isSecondary={false}
            className="submit-login-form"
            text="Submit"
            type="submit"
          />
          <CustomLink
            URL="/register"
            text="don't have account? Sign Up"
            custom={true}
            className="register-link"
          />
        </form>
      </section>
    </>
  );
};

export default Login;
