import logo from './assets/logo.png'

import './Logo.css'

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logo} className="logo"></img>
      <span className="brand-name">Conta</span>
    </div>
  );
}

export default Logo;