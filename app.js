// ------------- app.js -------------
// type="module" দিয়ে <script> ট্যাগে লোড করবি

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// 🔥 Firebase config একবারই
const firebaseConfig = {
  apiKey: "AIzaSyBH05N22D-ZSpjrtiJTLZGKxERZzpaqheg",
  authDomain: "instacash-e1d5d.firebaseapp.com",
  projectId: "instacash-e1d5d",
  storageBucket: "instacash-e1d5d.firebasestorage.app",
  messagingSenderId: "123825323751",
  appId: "1:123825323751:web:624eea7c7a733cda2d6c42"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ---------- ✉️  Registration example ---------- */
export async function register(email, password) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", cred.user.uid);
    // অন্য কাজ করতে পারিস, যেমন Firestore-এ ডাটা রাখা
  } catch (err) {
    console.error("Register error:", err.message);
  }
}

/* ---------- 🔑  Login example ---------- */
export async function login(email, password) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in:", cred.user.uid);
  } catch (err) {
    console.error("Login error:", err.message);
  }
}

/* ---------- 👁️  UID শো করার লজিক ---------- */
onAuthStateChanged(auth, (user) => {
  const span = document.getElementById("userUid");
  if (span) {
    span.innerText = user ? user.uid : "Not Logged In";
  }
});
