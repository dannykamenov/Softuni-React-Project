import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'; 
import BG from "../../../assets/BG.png";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { ref, set, get } from "firebase/database";

const LoginComponent = ({isToggled}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = React.useState('');

  const onSubmit = (data) => {
    //log into firebase
    //redirect to home page
    signInWithEmailAndPassword(auth, data.userName, data.userPassword)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            localStorage.setItem('user', JSON.stringify(user));
            //get role from database
            //redirect to home page
            const userRef = ref(db, `users/${user.uid}`);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    localStorage.setItem('role', snapshot.val().role);
                    window.location.href = '/';
                } else {
                    console.log("No data available");
                }
            });
        }).catch((error) => {
            let message = ''
            switch (error.code) {
                case 'auth/invalid-email':
                    message = 'Email is invalid!'
                    break;
                case 'auth/user-disabled':
                    message = 'User is disabled!'
                    break;
                case 'auth/user-not-found':
                    message = 'User not found!'
                    break;
                case 'auth/wrong-password':
                    message = 'Wrong password!'
                    break;
                case 'auth/invalid-login-credentials':
                    message = 'Invalid login credentials!'
                    break;
                default:
                    message = 'Something went wrong!'
                    break;
            }
            setError(message);
        });
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
                        className="formControl usernameinput"
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