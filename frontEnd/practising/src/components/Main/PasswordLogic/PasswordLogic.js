import { useRef } from "react";
import FormInput from "../FormInput/FormInput";

import "./PasswordLogic.css";

const PasswordLogic = ({ dataToUse, handleFormData }) => {
  const passwordField = useRef(null);
  const confirmPasswordField = useRef(null);

  const switchPasswordVisibility = (field) => {
    return (e) => {
      const passwordCurrentType = field.current.getAttribute("type", "text");

      e.target.classList.toggle("change-visibility-icon");

      if (passwordCurrentType === "text") {
        field.current.setAttribute("type", "password");
      } else {
        field.current.setAttribute("type", "text");
      }
    };
  };

  const handleConfirmPasswordChange = (e) => {
    handleFormData(e);

    e.target.style.borderColor = "silver";

    if (e.target.value !== dataToUse?.password && e.target.value) {
      e.target.style.borderColor = "#ff0000";
    } else if (e.target.value === dataToUse?.password && e.target.value) {
      e.target.style.borderColor = "green";
    }
  };

  return (
    <>
      <div className="password-field-container">
        <FormInput
          id="password"
          className="password-field"
          type="password"
          name="password"
          value={dataToUse?.password}
          isRequired={true}
          onChangeHandlerFN={handleFormData}
          ref={passwordField}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!.%*&])[A-Za-z\d@$!.%*?&]{8,30}$"
          title="Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        />
        <span
          onClick={switchPasswordVisibility(passwordField)}
          className="toggle-password-visibility"
          role="button"
          aria-pressed={"true"}
        ></span>
      </div>

      <div className="password-field-container">
        <FormInput
          id="confirm-password"
          className="password-field"
          type="password"
          name="confirmPassword"
          isRequired={true}
          value={dataToUse?.confirmPassword}
          onChangeHandlerFN={handleConfirmPasswordChange}
          ref={confirmPasswordField}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!.%*&])[A-Za-z\d@$!.%*?&]{8,30}$"
          title="confirm password and password should match!"
        />
        <span
          onClick={switchPasswordVisibility(confirmPasswordField)}
          className="toggle-password-visibility"
          role="button"
          aria-pressed={"true"}
        ></span>
      </div>
    </>
  );
};

export default PasswordLogic;
