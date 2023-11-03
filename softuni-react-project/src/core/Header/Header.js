import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth'; // Make sure the paths are correct for your project
import ToggleService from '../../services/toggle'; // Make sure the paths are correct for your project
import logo from '../../assets/logos/LOGO.png'; // Adjust the import path as needed
import './Header.scss';

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [opacityActive, setOpacityActive] = useState(true);
  const [isBusiness, setIsBusiness] = useState(false);
  const [role, setRole] = useState('');

  // Check the localStorage for role when component mounts
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole === 'user') {
      setRole('user');
    } else if (storedRole === 'business') {
      setRole('business');
    }
  }, []);

  const isLoggedIn = AuthService.isLoggedIn; // Assuming AuthService provides this as a method or property

  const menuToggle = () => {
    setMenuActive(!menuActive);
    setOpacityActive(!opacityActive);
  };

  const clientChange = () => {
    setIsBusiness(!isBusiness);
    ToggleService.toggleView(); // Assuming this service will handle the toggling logic
  };

  const signOutHandler = (event) => {
    event.preventDefault();
    AuthService.signOut(); // Replace with your actual AuthService sign out method
  };

  return (
    <header>
      <div className="navbar-header">
        <Link className="logo" to="/">
          <img src={logo} alt="logo" />
        </Link>
        <nav>
          <ul className="nav__links">
            {isLoggedIn && (
              <>
                {role === 'user' && <li><Link to="/search">Search</Link></li>}
                {role === 'business' && <li><Link to="/products">My Products</Link></li>}
                <li><Link to="/my-profile">My Profile</Link></li>
                <li><a href="/" onClick={signOutHandler}>Logout</a></li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
        {!isLoggedIn && (
          <div className="togglebox headerbox">
            <a href="/" className="plain">Client</a>
            <label className="switch">
              <input type="checkbox" checked={isBusiness} onChange={clientChange} />
              <span className="slider round"></span>
              <p>Business</p>
            </label>
            <a href="/" className="plain">Business</a>
          </div>
        )}
        <p className="menu cta" onClick={menuToggle}>Menu</p>
      </div>

      <div className={`overlay ${menuActive ? 'overlay--active' : ''}`}>
        <Link to="/"><img src={logo} alt="Logo" /></Link>
        <a href="/" className="close" onClick={menuToggle}>&times;</a>
        <div className={`overlay__content ${opacityActive ? 'opacity' : ''}`}>
          {isLoggedIn && (
            <>
              {role === 'business' && <li><Link to="/products" onClick={menuToggle}>My Products</Link></li>}
              {role === 'user' && <li><Link to="/search" onClick={menuToggle}>Search</Link></li>}
              <li><Link to="/my-profile" onClick={menuToggle}>My Profile</Link></li>
              <li className="logout-btn"><a href="/" onClick={signOutHandler}>Logout</a></li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li><Link to="/login" onClick={menuToggle}>Login</Link></li>
              <li><Link to="/register" onClick={menuToggle}>Register</Link></li>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
