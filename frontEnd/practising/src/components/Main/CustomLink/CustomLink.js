import { Link } from "react-router-dom";

import './CustomLink.css'

const CustomLink = ({className, URL = "#", text = "", isSecondary = true, custom = false}) => {
  const classNameDefault = !isSecondary && !custom
  ? "main" : !custom && isSecondary
  ? "secondary"
  : ""

  return (
    <Link to={URL} className={`${classNameDefault} Link ${className}`}>{text}</Link>
  );
}

export default CustomLink;