import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, sendEmailVerification, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseApp from "../firebase";

class AuthService {
  constructor(firebaseApp) {
    this.auth = getAuth(firebaseApp);
    this.db = getFirestore(firebaseApp);
    this.rtdb = getDatabase(firebaseApp);
    this.initializeAuthListener();
  }

  initializeAuthListener() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        // Possibly do more setup here (like fetching user roles etc.)
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  async signIn(email, password) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      // Set user data in Firestore
      await this.setUserData(result.user);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async signUp(email, password) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      await sendEmailVerification(result.user);
      await this.setUserData(result.user);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async forgotPassword(passwordResetEmail) {
    try {
      await sendPasswordResetEmail(this.auth, passwordResetEmail);
      alert('Password reset email sent, check your inbox.');
    } catch (error) {
      alert(error.message);
    }
  }

  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified;
  }

  async googleAuth() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(this.auth, provider);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async setUserData(user) {
    const userRef = doc(this.db, `users/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    await setDoc(userRef, userData, { merge: true });

    // Example of using Realtime Database
    const roleRef = ref(this.rtdb, `users/${user.uid}`);
    onValue(roleRef, (snapshot) => {
      const data = snapshot.val();
      localStorage.setItem('role', data.role);
    });
  }

  async signOut() {
    try {
      await signOut(this.auth);
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      // Redirect or perform additional cleanup if necessary
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default AuthService;