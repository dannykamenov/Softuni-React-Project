import React, { useState, useEffect } from "react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { db } from "../../../firebase"; // Import your Firebase storage instance
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import "./MyProfile.css";
import BG from "../../../assets/BG.png";

const MyProfileComponent = () => {
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  const [isUpdating, setIsUpdating] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Assuming you've handled user authentication and have a current user
    setUser(auth.currentUser);
  }, [auth.currentUser]);

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const changeDisplay = () => {
    setIsUpdating(true);
  };

  const updateProfileInfo = async (displayName) => {
    if (file) {
      // Handle file upload and update profile picture
    } else {
      // Update only displayName if no file is chosen
      await updateProfile(user, { displayName });
      setIsUpdating(false);
    }
  };

  const detectFiles = (event) => {
    setFile(event.target.files[0]);
  };

  // This JSX structure matches the Angular template you provided
  return (
    <main>
      <section className="contact-us-section">
        <img src={BG} alt="" className="contact-us-image" />
        {/* SVG and other static content... */}
      </section>
      <section className="overlap-contact-section">
        <div className="contact-form">
          <div className="container">
            <div className="displayTable">
              {user && !isUpdating && (
                <div>
                  <h2 className="container-head">My Profile</h2>
                  <img
                    className="align-self-start mr-5 img-thumbnail rounded-circle"
                    src={user.photoURL || "/assets/dummy-user.png"}
                    alt={user.displayName || "User"}
                  />
                  <div className="media-body">
                    <h2>Hello, {user.displayName || "User"}</h2>
                    <p>
                      <strong>User ID: </strong>
                      {user.uid}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      {user.email}
                    </p>
                    <p>
                      <strong>Verified: </strong>
                      <u>{String(user.emailVerified)}</u>
                    </p>
                  </div>
                  <div className="button-container">
                    <button className="update-profile" onClick={changeDisplay}>
                      Change Profile
                    </button>
                    <button className="button" onClick={handleSignOut}>
                      <i className="fas fa-sign-out-alt"></i>Log out
                    </button>
                  </div>
                </div>
              )}
              {user && isUpdating && (
                <div>
                  <h2 className="container-head">Change Profile</h2>
                  <img
                    className="align-self-start mr-5 img-thumbnail rounded-circle"
                    src={user.photoURL || "/assets/dummy-user.png"}
                    alt={user.displayName || "User"}
                  />
                  <div className="media-body">
                    <div className="formGroup">
                      <input
                        type="text"
                        className="formControl"
                        placeholder={user.displayName || "Set Username"}
                        // Add logic to manage this state or form
                      />
                    </div>
                    <div className="formGroup">
                      <input
                        type="file"
                        id="myFile"
                        name="filename"
                        onChange={detectFiles}
                      />
                    </div>
                  </div>
                  <div className="button-container">
                    <button
                      className="save-profile"
                      onClick={() =>
                        updateProfileInfo(/* value from state or form */)
                      }
                    >
                      Save Profile
                    </button>
                    <button className="button" onClick={handleSignOut}>
                      <i className="fas fa-sign-out-alt"></i>Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MyProfileComponent;
