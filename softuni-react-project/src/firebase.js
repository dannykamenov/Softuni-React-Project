import firebase from 'firebase/app';
import 'firebase/auth';  
import 'firebase/firestore';  



const firebaseConfig = {
    apiKey: "AIzaSyCSiEKNmP6n-c00OiaXJYRTyAmpSx93fGQ",
    authDomain: "softuni-fest-2023.firebaseapp.com",
    databaseURL: "https://softuni-fest-2023-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "softuni-fest-2023",
    storageBucket: "softuni-fest-2023.appspot.com",
    messagingSenderId: "441363943360",
    appId: "1:441363943360:web:c8076ea02fab940edf0225",
    measurementId: "G-DWVX51CJWT"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;