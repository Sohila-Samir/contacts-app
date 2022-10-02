import gmailIcon from "./assets/gmail.png";
import mapIcon from "./assets/map-marker.png";
import phoneIcon from "./assets/phone.png";

import CustomLink from "../../components/Main/CustomLink/CustomLink";
import Logo from "../../components/Main/Logo/Logo";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="main-about-container">
        <div className="about-container">
          <Logo />

          <p className="footer-about-brief">
            Culpa do est laboris ad laboris. Pariatur incididunt id aliquip quis
            quis. Pariatur incididunt id aliquip quis quis.
          </p>

          <div className="footer-media-links-container">
            <CustomLink
              custom={true}
              className="footer-facebook-link"
              isSecondary={false}
            />
            <CustomLink
              custom={true}
              className="footer-twitter-link"
              isSecondary={false}
            />
            <CustomLink
              custom={true}
              className="footer-linkedin-link"
              isSecondary={false}
            />
          </div>
        </div>

        <div className="links-container">
          <CustomLink
            className="footer-link-1"
            custom={true}
            text="link1"
            isSecondary={false}
          />
          <CustomLink
            className="footer-link-2"
            custom={true}
            text="link2"
            isSecondary={false}
          />
          <CustomLink
            className="footer-link-3"
            custom={true}
            text="link3"
            isSecondary={false}
          />
          <CustomLink
            className="footer-link-4"
            custom={true}
            text="link4"
            isSecondary={false}
          />
          <CustomLink
            className="footer-link-5"
            custom={true}
            text="link5"
            isSecondary={false}
          />
          <CustomLink
            className="footer-link-6"
            custom={true}
            text="link6"
            isSecondary={false}
          />
          <CustomLink
            className="footer-link-7"
            custom={true}
            text="link7"
            isSecondary={false}
          />
        </div>
      </div>

      <div className="contact-us-container">
        <div className="contact-us-heading-container">
          <h3>Contact Us</h3>
        </div>

        <div className="contacts-options-container">
          <div className="logos-icons-container">
            <img className="contact-us-logo" src={gmailIcon}></img>
            <img className="contact-us-logo" src={phoneIcon}></img>
            <img className="contact-us-logo" src={mapIcon}></img>
          </div>

          <div className="contacts-options-details">
            <p>mywebsite@gmail.com</p>
            <p>(217) 456-8446</p>
            <p>65st,lorem ipsum dolar,LA</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
