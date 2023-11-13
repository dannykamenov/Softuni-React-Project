import React, { useState, useEffect } from "react";
import { getAuth, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import { db, storage } from "../../../firebase"; 
import {
  ref,
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
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // cleanup observer on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const changeDisplay = () => {
    setIsUpdating(true);
  };

  const updateProfileInfo = async () => {
    if (file) {
        // Upload file to Firebase storage
        const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
        await uploadBytes(storageRef, file);
    
        // Get download URL
        const downloadURL = await getDownloadURL(storageRef);
    
        // Update displayName and photoURL
        await updateProfile(user, {
            displayName: newName || user.displayName,
            photoURL: downloadURL,
        });
        setIsUpdating(false);
    } else {
      // Update only displayName if no file is chosen
      await updateProfile(user, { displayName: newName || user.displayName });
      setIsUpdating(false);
    }
  };

  const detectFiles = (event) => {
    setFile(event.target.files[0]);
  };

  const handleNameChange = (event) => {
    const {value} = event.target;
    if(value.length < 4) {
        setError('Name must be at least 4 characters long!');
        return;
    }
    setNewName(value);
    setError('');
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
                        className="formControl usernameinput"
                        placeholder={user.displayName || "Set Username"}
                        name="username"
                        onChange={handleNameChange}
                        disabled={localStorage.getItem("role") === "user"}

                      />
                      {error && <p className="error">{error}</p>}
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
                        updateProfileInfo()
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
