import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./../../components/Main/Button/Button";
import CustomLink from "./../../components/Main/CustomLink/CustomLink";
import FormInput from "./../../components/Main/FormInput/FormInput";
import PasswordLogic from "./../../components/Main/PasswordLogic/PasswordLogic";

import {
  checkUserExistence,
  sendUserVerifyEmail,
} from "../../axios/api-endpoints/User-endpoints";
import useDetectCapsLockState from "../../hooks/useDetectCapsLockState";
import { login, register } from "./../../axios/api-endpoints/auth-endpoints";
import useAuth from "./../../hooks/useAuth";

import "./Register.css";

const Register = () => {
  const { handleAuthData } = useAuth();
  const [handleCapsLockState, CapsLockDetect] = useDetectCapsLockState();

  const navigate = useNavigate();

  const [isUsernameExists, setIsUsernameExists] = useState("");

  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    name: "",
    password: "",
    email: "",
    phoneNumber: "",
    birthday: "",
    userAvatar: "",
  });

  useEffect(() => {
    document.addEventListener("keyup", handleCapsLockState);

    return () => {
      document.removeEventListener("keyup", handleCapsLockState);
    };
  }, [handleCapsLockState, CapsLockDetect]);

  useEffect(() => {
    let isUserExists;
    if (registerFormData.username) {
      isUserExists = setTimeout(async () => {
        const controller = new AbortController();
        const res = await checkUserExistence(
          registerFormData.username,
          controller.signal
        );
        if (res) setIsUsernameExists("user already exists");
      }, 1000);
    } else {
      setIsUsernameExists("");
    }

    return () => {
      clearTimeout(isUserExists);
    };
  }, [registerFormData.username]);

  const handleChange = (e) => {
    setRegisterFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginUserOnRegister = async () => {
    const res = await login({
      email: registerFormData.email,
      password: registerFormData.password,
      confirmPassword: registerFormData.password,
    });
    handleAuthData(res);
  };

  const registerUser = async (signal) => {
    const res = await register(registerFormData, signal);
    if (res) {
      const isEmailSend = await sendUserVerifyEmail(
        res?._id,
        res?.email,
        signal
      );
      if (isEmailSend) await loginUserOnRegister();
      navigate("/");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const controller = new AbortController();

    registerUser(controller.signal);
  };

  const toggleOptionalMenu = (e) => {
    const optionalFieldsContainer = document.querySelector(
      ".optional-register-fields"
    );

    optionalFieldsContainer.classList.toggle("toggle-optional-menu");

    e.target.classList.toggle("toggle-optional-menu-icon");
  };

  return (
    <section className="register-form-section">
      <div className="register-form-container">
        <h1>Sign Up</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <article className="required-register-container">
            <h2>Required:</h2>
            <div className="required-register-fields">
              <FormInput
                id="username"
                className="username-form-field"
                type="text"
                name="username"
                isRequired={true}
                value={registerFormData.username}
                onChangeHandlerFN={handleChange}
              />

              {isUsernameExists ? <p>{isUsernameExists}</p> : ""}

              <FormInput
                id="name"
                className="name-form-field"
                type="text"
                name="name"
                isRequired={true}
                value={registerFormData.name}
                onChangeHandlerFN={handleChange}
              />
              <FormInput
                id="email"
                className="email-form-field"
                type="email"
                name="email"
                isRequired={true}
                value={registerFormData.email}
                onChangeHandlerFN={handleChange}
              />
              <PasswordLogic
                dataToUse={registerFormData}
                handleFormData={handleChange}
              />
            </div>
          </article>

          <article className="optional-register-container">
            <div className="optional-header-container">
              <h2>Optional:</h2>
              <span
                className="optional-menu-icon"
                onClick={toggleOptionalMenu}
              ></span>
            </div>

            <div className="optional-register-fields">
              <FormInput
                id="phoneNumber"
                className="phoneNumber-form-field"
                type="number"
                name="phoneNumber"
                value={registerFormData.phoneNumber}
                onChangeHandlerFN={handleChange}
              />
              <FormInput
                id="birthday"
                className="birthday-form-field"
                type="date"
                name="birthday"
                value={registerFormData.birthday}
                onChangeHandlerFN={handleChange}
              />
            </div>
          </article>

          {CapsLockDetect}

          <Button
            className="register-btn"
            type="submit"
            isSecondary={false}
            text="Register"
          />

          <CustomLink
            URL="/login"
            text="Already have an account? Sign In"
            custom={true}
            className="login-link"
          />
        </form>
      </div>
    </section>
  );
};

export default Register;
