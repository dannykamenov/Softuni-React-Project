import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {auth} from '../../../firebase';
import './ConfirmEmail.css';
import BG from '../../../assets/BG.png';
import { sendEmailVerification } from 'firebase/auth';

const VerifyPage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  const sendVerificationMail = () => {
    const user = auth.currentUser;
    if (user) {
      sendEmailVerification(user).then(() => {
        navigate('/login');
      }).catch((error) => {
        console.error('Error sending verification email:', error);
      });
    }
  };

  return (
    <main>
      <section className="contact-us-section">
        <img src={BG} alt="" className="contact-us-image" />
        {/* SVG and other static content... */}
      </section>
      <section className="overlap-contact-section">
        <div className="contact-form">
          <div className="container">
            <h2>Thank You for Registering</h2>
            <div className="displayTable">
              <div className="displayTableCell">
                <div className="authBlock">
                  {userEmail && (
                    <div className="formGroup">
                      <p className="text-center">We have sent a confirmation email to <strong>{userEmail}</strong>.</p>
                      <p className="text-center">Please check your email and click on the link to verify your email address.</p>
                    </div>
                  )}
                  <div className="formGroup">
                    <button type="button" className="btn btnPrimary" onClick={sendVerificationMail}>
                      <i className="fas fa-redo-alt"></i>
                      Resend Verification Email
                    </button>
                  </div>
                </div>
                <div className="redirectToLogin">
                  <span>Go back to?<Link to="/login" className="redirect"> Sign in</Link></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VerifyPage;