import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form"; // Assuming you use React Hook Form for form handling
import PropTypes from "prop-types";
import "./Register.css";

const RegisterComponent = ({ isToggled }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onChange" });
  const [error, setError] = useState(""); // This is a hypothetical custom hook for handling the toggle

  const onSubmit = async (data) => {
    try {
        // Handle form submission
        console.log(data);
    } catch (authError) {
      // Handle errors
      setError(authError.message);
    }
  };

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
                        type="text" // type should be "text" for a full name
                        className="formControl"
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
                    <a className="redirect" href="/login">
                      Log In
                    </a>
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
