import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'; // Assuming you use React Hook Form for form handling
import PropTypes from 'prop-types';
import './Register.css';

const RegisterComponent = ({isToggled}) => {
  const { register, handleSubmit, watch, formState: { errors}, setValue } = useForm();
  const [error, setError] = useState('');// This is a hypothetical custom hook for handling the toggle

  const onSubmit = async (data) => {
    try {
      // Your authentication logic here
      // updateProfile, createUser, etc.
    } catch (authError) {
      // Handle errors
      setError(authError.message);
    }
  };

  const password = watch("password");

  const matchPassword = (repeatPassword) => {
    return repeatPassword === password;
  }

  useEffect(() => {
    // Reset errors when toggling
    // Update form validators accordingly
  });

  

  return (
    <main>
      <section className="contact-us-section">
        <img src="/assets/data/BG.png" alt="" className="contact-us-image" />
      </section>
      <section className="overlap-contact-section">
        <div className="contact-form">
          <div className="container">
            <h2>Register</h2>
            <div className="displayTable">
              <div className="displayTableCell">
                <div className="authBlock">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formGroup">
                      <input
                        type="name"
                        className="formControl"
                        placeholder={isToggled ? "Your Company Name" : "Your Name"}
                        name="name"
                        ref={register("name", { required: true, minLength: 4 })}
                      />
                      {/* {errors.name && <p className="error">Name is required and must be at least 4 characters long.</p>} */}
                    </div>
                    {/* Other input fields */}
                    <div className="formGroup">
                      <input
                        type="password"
                        className="formControl"
                        placeholder="Password"
                        name="password"
                        ref={register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" }})}
                      />
                      {/* {errors.password && <p className="error">Password is required and must be at least 6 characters long.</p>} */}
                    </div>
                    <div className="formGroup">
                      <input
                        type="password"
                        className="formControl"
                        placeholder="Repeat Password"
                        name="repassword"
                        ref={register("password", { required: "You must confirm your password", validate: matchPassword })}
                      />
                      {/* {errors.repassword && <p className="error">Passwords must match.</p>} */}
                    </div>
                    <div className="formGroup">
                      <input
                        type="submit"
                        className="btn btnPrimary"
                        value="Sign Up"
                        /* disabled={Object.keys(errors).length > 0} */
                      />
                      {/* {error && <p className="error">{error}</p>} */}
                    </div>
                  </form>
                </div>
                <div className="redirectToLogin">
                  <span>
                    Already have an account?
                    <a className="redirect" href="/login">Log In</a>
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

RegisterComponent.propTypes = {
  isToggled: PropTypes.bool,
};

export default RegisterComponent;