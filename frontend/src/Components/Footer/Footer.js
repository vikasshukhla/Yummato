// Footer.js
import React from "react";
import "./Footer.css"; // Import your CSS file for styling
import yummato from "../../images/yummato.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={yummato} alt="Food Delivery" />
            <p>Delicious food delivered to your doorstep.</p>
          </div>
          <div className="footer-links">
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/restaurant'>Restaurant</Link></li>
              <li><Link to='about'>About Us</Link></li>
              <li><Link to='contact'>Contact</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <p>Contact Us:</p>
            <p>Email: contact@fooddelivery.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Food Delivery. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;