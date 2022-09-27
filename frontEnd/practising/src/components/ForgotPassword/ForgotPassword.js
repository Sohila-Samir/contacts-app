import { useState } from "react";

import Button from "../Main/Button/Button";
import FormInput from "../Main/FormInput/FormInput";

import { sendResetPasswordEmail } from "../../axios/api-endpoints/auth-endpoints";

import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");

  const handleEmail = (element) => {
    if (isEmailSent) setIsEmailSent("");
    setEmail(element.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    const res = await sendResetPasswordEmail(controller.signal, email);
    setIsEmailSent(res?.message);
  };

  return (
    <form className="forgot-password-container" onSubmit={handleSubmit}>
      <h1>Forgot password</h1>
      <FormInput
        id="email"
        className="email"
        type="email"
        value={email}
        required={true}
        onChangeHandlerFN={handleEmail}
      />
      {isEmailSent ? (
        <p
          className="is-email-registered-msg"
          style={{
            color:
              isEmailSent === "could not find an account with this email!"
                ? "red"
                : "green",
          }}
        >
          {isEmailSent}
        </p>
      ) : (
        ""
      )}
      <Button type="submit" custom={false} isSecondary={false} text="Confirm" />
    </form>
  );
};

export default ForgotPassword;
