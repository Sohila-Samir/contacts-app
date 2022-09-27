import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../axios/api-endpoints/auth-endpoints";
import Button from "../../components/Main/Button/Button";
import PasswordLogic from "../../components/Main/PasswordLogic/PasswordLogic";

import "./ResetPasswordForm.css";

const ResetPassword = () => {
  const { token: resetTkn } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [resetPasswordData, setResetPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handlePasswordData = (element) => {
    setResetPasswordData((prevState) => ({
      ...prevState,
      [element.target.name]: element.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    const res = await resetPassword(
      controller.signal,
      resetPasswordData,
      resetTkn
    );

    if (!res?.success) {
      setErrorMessage(res?.message);
    } else {
      navigate("/login");
    }
  };

  return (
    <main className="reset-password-container">
      <h1>Reset Password</h1>

      <form className="reset-password-form" onSubmit={handleSubmit}>
        <PasswordLogic
          dataToUse={resetPasswordData}
          handleFormData={handlePasswordData}
        />
        {errorMessage ? <p className="error-message">{errorMessage}</p> : ""}

        <Button
          type="submit"
          text="Confirm"
          isSecondary={false}
          custom={false}
        />
      </form>
    </main>
  );
};

export default ResetPassword;
