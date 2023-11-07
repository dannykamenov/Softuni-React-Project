import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from '../../../assets/LOGO.png'
import PropTypes from 'prop-types';
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";

const Header = ({ onToggleChange }) => {
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
  const [menuActive, setMenuActive] = useState(false);

  const menuToggle = () => setMenuActive(!menuActive);
  const clientChange = (event) => {
    onToggleChange(event.target.checked)
  };

    const logout = () => {
        signOut(auth);
        localStorage.clear();
        window.location.href = '/';
    };

  return (
    <header>
      <div className="navbar-header">
        <Link to='/'>
          <img src={logo} alt="logo" />
        </Link>
        <nav>
          <ul className="nav__links">
            {isLoggedIn && roleUser && (
              <li>
                <Link to="/search">Search</Link>
              </li>
            )}
            {isLoggedIn && roleBusiness && (
              <li>
                <Link to="/products">My Products</Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link to="/my-profile">My Profile</Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link onClick={logout}>Logout</Link>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <Link to="/register">Register</Link>
              </li>
            )}
          </ul>
        </nav>
        {!isLoggedIn && (
          <div className="togglebox headerbox">
            <a href="#" className="plain">
              Client
            </a>
            <label className="switch">
              <input type="checkbox" onChange={clientChange} />
              <span className="slider round"></span>
            </label>
            <a href="#" className="plain">
              Business
            </a>
          </div>
        )}
        <p className="menu cta" onClick={menuToggle}>
          Menu
        </p>
      </div>
      <div className={`overlay ${menuActive ? "overlay--active" : ""}`}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <a href="#" className="close" onClick={menuToggle}>
          &times;
        </a>
        <div className={`overlay__content ${menuActive ? "" : "opacity"}`}>
          {isLoggedIn && roleBusiness && (
            <li>
              <Link to="/products" onClick={menuToggle} className="menu-active">
                My Products
              </Link>
            </li>
          )}
          {isLoggedIn && roleUser && (
            <li>
              <Link to="/search" onClick={menuToggle} className="menu-active">
                Search
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link
                to="/my-profile"
                onClick={menuToggle}
                className="menu-active"
              >
                My Profile
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li className="logout-btn">
              <a href="#">Logout</a>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="/login" onClick={menuToggle} className="menu-active">
                Login
              </Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="/register" onClick={menuToggle} className="menu-active">
                Register
              </Link>
            </li>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
    onToggleChange: PropTypes.func.isRequired,
};

export default Header;
