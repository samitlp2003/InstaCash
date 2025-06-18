// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBH05N22D-ZSpjrtiJTLZGKxERZzpaqheg",
  authDomain: "instacash-e1d5d.firebaseapp.com",
  projectId: "instacash-e1d5d",
  storageBucket: "instacash-e1d5d.firebasestorage.app",
  messagingSenderId: "123825323751",
  appId: "1:123825323751:web:624eea7c7a733cda2d6c42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Registration example
createUserWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    // Signed in
    const user = userCredential.user;
    console.log("User registered:", user);
  })
  .catch(error => {
    console.error(error);
  });
