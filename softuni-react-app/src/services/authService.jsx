import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firebaseDB } from './firebase'; // Make sure to set up the Firebase DB connection as per your Firebase configuration

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        // You should get the role from the database
        // Here we're just setting a placeholder role
        const roleFromDB = 'user'; // Replace with actual call to get role from DB
        localStorage.setItem('role', roleFromDB);
        setRole(roleFromDB);
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
      window.location.reload();
    } catch (error) {
      return error;
    }
  };

  const signUp = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // You should send email verification and set user data here
      navigate('/verify-email');
    } catch (error) {
      return error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent, check your inbox.');
    } catch (error) {
      alert(error.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    user,
    role,
    signIn,
    signUp,
    forgotPassword,
    signOutUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// Example usage:
// const { user, signIn, signOutUser } = useAuth();
