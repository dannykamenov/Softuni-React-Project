import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../../assets/LOGO.png'

const Footer = () => {
    let isLoggedIn = false;
    if (!localStorage.getItem("user")) {
      isLoggedIn = false;
    } else {
      isLoggedIn = true;
    }
  
    let roleUser = false;
    let roleBusiness = false;
    if (localStorage.getItem("role") === "user") {
      roleUser = true;
      roleBusiness = false;
    }
    if (localStorage.getItem("role") === "business") {
      roleUser = false;
      roleBusiness = true;
    }
  return (
    <>
      <footer>
        <div className="footer-info-holder">
          <Link to='/'>
          <img src={logo} alt="LOGO" />
          </Link>
          <ul className="nav__links footer__links">
            {isLoggedIn && (
              <>
                {roleUser && (
                  <li>
                    <Link to="/search">Search</Link>
                  </li>
                )}
                {roleBusiness && (
                  <li>
                    <Link to="/products">My Products</Link>
                  </li>
                )}
                <li>
                  <Link to="/my-profile">My Profile</Link>
                </li>
                <li>
                  <a href="/" onClick={(e) => {
                    e.preventDefault();
                  }}>Logout</a>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2935.160042302595!2d23.368746!3d42.636767000000006!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85cb55668ae1%3A0x447f9dd693e57def!2sSoftware%20University!5e0!3m2!1sen!2sus!4v1698499750043!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Our Location"
          ></iframe>
        </div>
      </footer>
      <p className="copyright">
        Designed by
        <a href="https://dannykamenov.com/" target="_blank" rel="noopener noreferrer">
        &nbsp;Danny Kamenov&nbsp;
        </a>
        &copy; 2023
      </p>
    </>
  );
};

export default Footer;