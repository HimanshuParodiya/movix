import React from "react";
import "./Footer.scss";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import ContentWrapper from "../contentWrapper/ContentWrapper";

const Footer = () => {
  return (
    <footer className="footer__container">
      <ContentWrapper>
        <ul className="footer__menuItems">
          <li className="footer__menuItem">Terms Of Use</li>
          <li className="footer__menuItem">Privacy-Policy</li>
          <li className="footer__menuItem">About</li>
          <li className="footer__menuItem">Blog</li>
          <li className="footer__menuItem">FAQ</li>
        </ul>
        <div className="footer__infoText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </div>
        <div className="footer__socialIcons">
          <span className="footer__icon">
            <FaFacebookF />
          </span>
          <span className="footer__icon footer__instaIcon">
            <FaInstagram />
          </span>
          <span className="footer__icon">
            <FaTwitter />
          </span>
          <span className="footer__icon">
            <FaLinkedin />
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
