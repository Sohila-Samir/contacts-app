import { Link } from "react-router-dom";

import './Button.css'

const Button = ({
  text,
  handleFunction,
  type = "button",
  isSecondary = true,
  isLink = false,
  URL = 'http://localhost:300/'
}) => {
  return (
    isLink
    ? <Link to={URL} className={isSecondary ? 'btn secondary' : 'btn main'}>{text}</Link>
    : handleFunction
    ? <button
        type={type}
        onClick={handleFunction}
        className={isSecondary ? 'btn secondary' : 'btn main'
      }>{text}
      </button>
    : <button
        type={type}
        className={isSecondary ? 'btn secondary' : 'btn main'
      }>{text}
      </button>
  )
}

export default Button;