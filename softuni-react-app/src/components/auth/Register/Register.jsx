import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'; // Assuming you use React Hook Form for form handling
import PropTypes from 'prop-types';
import './Register.css';

const RegisterComponent = ({isToggled}) => {
  const { register, handleSubmit, watch, errors, setValue } = useForm();
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

  useEffect(() => {
    // This effect runs when 'isToggled' changes. You would set your validators here.
    // For simplicity, I'm just updating the placeholder value
    const namePlaceholder = isToggled ? "Your Company Name" : "Your Name";
    setValue("name", "", { shouldValidate: true });
    // Update form validators accordingly
  }, [isToggled, setValue]);

  // Assume that `matchPassword` is a custom validator function you have created
  const password = watch("password");

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
                        //ref={register('name', { required: true, minLength: 4 })}
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
                        //ref={register('password', { required: true, minLength: 6 })}
                      />
                      {/* {errors.password && <p className="error">Password is required and must be at least 6 characters long.</p>} */}
                    </div>
                    <div className="formGroup">
                      <input
                        type="password"
                        className="formControl"
                        placeholder="Repeat Password"
                        name="repassword"
                        //ref={register('repassword', { required: true, minLength: 6, validate: matchPassword(password) })}
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