import React from 'react';
import { Link } from 'react-router-dom';

const MainContent = ({ isToggled }) => {
    let userRole = false;
    if(localStorage.getItem('role')) {
        userRole = true;
    }
  return (
    <main>
      {!isToggled ? (
        <div className="maindiv">
          <section className="landingpage">
            <img className="mainimg" src="/assets/HomeClient.png" alt="" />
            <h2 className="headertitle">Find the solution to your problem. <br /> Join us now!</h2>
            <h3 className="description">Browse freely through our partners products <br /> and <br /> find the perfect solution for you!</h3>
            {!userRole ? (
              <Link to="/register" className="register-button">Get Started!</Link>
            ) : (
              <Link to="/search" className="register-button">Start Browsing!</Link>
            )}
          </section>
        </div>
      ) : (
        <div className="maindiv">
          <section className="landingpage">
            <img className="mainimg" src="/assets/HomeBusiness.png" alt="" />
            <h2 className="headertitle">Connect globally, get paid locally!<br /> Join us now!</h2>
            <h3 className="description">Join over XXX+ other businesses <br /> and <br /> scale to an unimaginable level!</h3>
            {!userRole ? (
              <Link to="/register" className="register-button">Get Started!</Link>
            ) : (
              <Link to="/create-product" className="register-button">Upload a product!</Link>
            )}
          </section>
        </div>
      )}
    </main>
  );
};

export default MainContent;