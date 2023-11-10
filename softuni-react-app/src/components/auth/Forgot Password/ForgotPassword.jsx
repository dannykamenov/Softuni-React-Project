import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom'; // You'll need react-router-dom for navigation
import './ForgotPassword.css';
import BG from '../../../assets/BG.png';
import {auth} from '../../../firebase';

const ResetPasswordComponent = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Password reset email sent!');
        // redirect to login page
        if(alert){
          window.location.href = '/login';
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <main>
      <section className="contact-us-section">
        <img src={BG} alt="" className="contact-us-image" />
      </section>
      <section className="overlap-contact-section">
        <div className="contact-form">
          <div className="container">
            <h2>Reset Password</h2>
            <div className="displayTable">
              <div className="displayTableCell">
                <div className="authBlock">
                  <p className="text-center">
                    Please enter your email address to request a password reset.
                  </p>
                  <div className="formGroup">
                    <input
                      type="email"
                      className="formControl"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="formGroup">
                    <input
                      type="submit"
                      className="btn btnPrimary"
                      value="Reset Password"
                      onClick={handleResetPassword}
                    />
                    {error && <p className="error">{error}</p>}
                  </div>
                </div>
                <div className="redirectToLogin">
                  <span>
                    Go back?&nbsp;  
                    <Link to="/login" className="redirect">Log In</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResetPasswordComponent;