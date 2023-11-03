import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Make sure you have 'react-router-dom' installed
import { authService } from '../services/authService'; // Update the import path as needed
import './Footer.scss';

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roleUser, setRoleUser] = useState(false);
  const [roleBusiness, setRoleBusiness] = useState(false);

  useEffect(() => {
    // Replace authService.isLoggedIn with an actual call to check if the user is logged in
    setIsLoggedIn(authService.isLoggedIn());

    const role = localStorage.getItem('role');
    setRoleUser(role === 'user');
    setRoleBusiness(role === 'business');
  }, []);

  const handleSignOut = (event) => {
    event.preventDefault();
    // Replace authService.SignOut with an actual sign-out method
    authService.signOut();
  };

  return (
    <footer>
      <div className="footer-info-holder">
        <img src="/assets/logos/LOGO.png" alt="Logo" />
        <ul className="nav__links footer__links">
          {isLoggedIn && (
            <>
              {roleUser && (
                <li><Link to="/search">Search</Link></li>
              )}
              {roleBusiness && (
                <li><Link to="/products">My Products</Link></li>
              )}
              <li><Link to="/my-profile">My Profile</Link></li>
              <li><a href="/" onClick={handleSignOut}>Logout</a></li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2935.160042302595!2d23.368746!3d42.636767000000006!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85cb55668ae1%3A0x447f9dd693e57def!2sSoftware%20University!5e0!3m2!1sen!2sus!4v1698499750043!5m2!1sen!2sus"
          title="Company Location"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <p className="copyright">
        Designed by
        <a href="https://dannykamenov.com/" target="_blank" rel="noopener noreferrer">Danny Kamenov</a>
        &copy; 2023
      </p>
    </footer>
  );
};

export default Footer;