import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form"; 
import PropTypes from "prop-types";
import "./Register.css";
import BG from "../../../assets/BG.png";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { ref, set } from "firebase/database";
import { Link } from "react-router-dom";

const RegisterComponent = ({ isToggled }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onChange" });
  const [error, setError] = useState(""); 

  const onSubmit = async (data) => {
    try {
      // Create account in firebase and set displayname
      // Redirect to login page
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then((userCredential) => {
        sendEmailVerification(auth.currentUser);
      });
      const authUser = getAuth();
      await updateProfile(authUser.currentUser, {
        displayName: data.name,
        photoURL:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg",
      });
      // Add user to database
        await createUser(authUser.currentUser.uid, data);
        window.location.href = '/verify-email';
    } catch (authError) {
        let message = ''
        switch (authError.code) {
            case 'auth/email-already-in-use':
                message = 'Email is already in use!'
                break;
            case 'auth/invalid-email':
                message = 'Email is invalid!'
                break;
            case 'auth/weak-password':
                message = 'Password is too weak!'
                break;
            default:
                message = 'Something went wrong!'
                break;
        }
      setError(message);
    }
  };

  const createUser = async (uid, data) => {
    try {
        const userRef = ref(db, `users/${uid}`);
        await set(userRef, {
            name: data.name,
            email: data.email,
            role: isToggled ? "business" : "user",
        });
    } catch (error) {
        console.log(error);
    }
  }

  const password = watch("password");

  useEffect(() => {
    // Reset errors when toggling
    // Update form validators accordingly
  });

  const validateNameSurname = (value) => {
    const parts = value.trim().split(" ");
    return parts.length >= 2 && parts[0].length > 0 && parts[1].length > 0;
  };

  return (
    <main>
      <section className="contact-us-section">
        <img src={BG} alt="" className="contact-us-image" />
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
                        type="text"
                        className="formControl usernameinput"
                        placeholder={
                          isToggled ? "Your Company Name" : "Your Name"
                        }
                        name="name"
                        {...register("name", {
                          required: true,
                          minLength: 4,
                          ...(isToggled
                            ? {}
                            : { validate: validateNameSurname }),
                        })}
                      />
                      {errors.name?.type === "minLength" && (
                        <p className="error">
                          Name is required and must be at least 4 characters
                          long.
                        </p>
                      )}
                      {!isToggled && errors.name?.type === "validate" && (
                        <p className="error">
                          Please enter both name and surname.
                        </p>
                      )}
                    </div>
                    <div className="formGroup">
                      <input
                        type="email"
                        className="formControl"
                        placeholder="Email"
                        name="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="error">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="formGroup">
                      <input
                        type="password"
                        className="formControl"
                        placeholder="Password"
                        name="password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message:
                              "Password must be at least 6 characters long",
                          },
                        })}
                      />
                      {errors.password && (
                        <p className="error">
                          Password is required and must be at least 6 characters
                          long.
                        </p>
                      )}
                    </div>
                    <div className="formGroup">
                      <input
                        type="password"
                        className="formControl"
                        placeholder="Repeat Password"
                        name="repassword"
                        {...register("rePassword", {
                          required: "You must confirm your password",
                          validate: (value) =>
                            value === password || "Passwords must match",
                        })}
                      />
                      {errors.rePassword && (
                        <p className="error">{errors.rePassword.message}</p>
                      )}
                    </div>
                    <div className="formGroup">
                      <input
                        type="submit"
                        className="btn btnPrimary"
                        value="Sign Up"
                        disabled={Object.keys(errors).length > 0}
                      />
                      {error && <p className="error">{error}</p>}
                    </div>
                  </form>
                </div>
                <div className="redirectToLogin">
                  <span>
                    Already have an account?
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

RegisterComponent.propTypes = {
  isToggled: PropTypes.bool,
};

export default RegisterComponent;
