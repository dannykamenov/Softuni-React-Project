import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'; 
import BG from "../../../assets/BG.png";

const LoginComponent = ({isToggled}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = React.useState('');

  const onSubmit = (data) => {
    // Handle login logic here
    console.log(data);
  };

  return (
    <main>
      <section className="contact-us-section">
        <img src={BG} alt="" className="contact-us-image" />
        {/* SVG shapes and other static content... */}
      </section>
      <section className="overlap-contact-section">
        <div className="contact-form">
          <div className="container">
            <h2>Login</h2>
            <div className="displayTable">
              <div className="displayTableCell">
                <div className="authBlock">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formGroup">
                      <input
                        type="text"
                        className="formControl"
                        placeholder="Email"
                        {...register("userName", { required: true, minLength: 6 })}
                      />
                      {errors.userName && (
                        <p className="error">
                          {errors.userName.type === 'required' && "Email is required!"}
                          {errors.userName.type === 'minLength' && "Not a valid email!"}
                        </p>
                      )}
                    </div>
                    <div className="formGroup">
                      <input
                        type="password"
                        className="formControl"
                        placeholder="Password"
                        {...register("userPassword", { required: true, minLength: 6 })}
                      />
                      {errors.userPassword && (
                        <p className="error">
                          {errors.userPassword.type === 'required' && "Password is required!"}
                          {errors.userPassword.type === 'minLength' && "Password must be at least 6 characters long!"}
                        </p>
                      )}
                    </div>
                    <div className="formGroup">
                      <input
                        type="submit"
                        className="btn btnPrimary"
                        value="Log in"
                      />
                      {error && <p className="error">{error}</p>}
                    </div>
                  </form>
                  <div className="forgotPassword">
                    <Link to="/forgot-password" className="redirect">Forgot Password?</Link>
                  </div>
                </div>
                <div className="redirectToLogin">
                  <span>
                    Don&apos;t have an account?
                    <Link to="/register" className="redirect">Sign Up</Link>
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

export default LoginComponent;