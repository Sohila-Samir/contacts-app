import { Link } from "react-router-dom";

import './Button.css'

const Button = ({
  text,
  custom,
  className,
  handleFunction,
  type = "button",
  isSecondary = true,
}) => {
  const classNameDefault = !isSecondary && !custom
  ? "main" : !custom && isSecondary
  ? "secondary"
  : ""

  return (
    handleFunction
    ? <button
        type={type}
        onClick={handleFunction}
        className={`${classNameDefault} btn ${className}`}
      >{text}
      </button>
    : <button
        type={type}
        className={`${classNameDefault} btn ${className}`}
      >{text}
      </button>
  )
}

export default Button;