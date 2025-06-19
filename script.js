// Firebase import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBH05N22D-ZSpjrtiJTLZGKxERZzpaqheg",
  authDomain: "instacash-e1d5d.firebaseapp.com",
  projectId: "instacash-e1d5d",
  storageBucket: "instacash-e1d5d.appspot.com",
  messagingSenderId: "123825323751",
  appId: "1:123825323751:web:624eea7c7a733cda2d6c42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ======================
// Country code display from <select>
// ======================
const countrySelect = document.getElementById('country');
const countryCodeSpan = document.getElementById('countryCode');

if (countrySelect && countryCodeSpan) {
  countryCodeSpan.textContent = countrySelect.value || '+___';
  countrySelect.addEventListener('change', () => {
    countryCodeSpan.textContent = countrySelect.value || '+___';
  });
}

// ======================
// Register form handler
// ======================
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const countryCode = countrySelect.value;
    const message = document.getElementById("message");

    if (password !== confirmPassword) {
      message.style.color = "red";
      message.textContent = "Passwords do not match!";
      return;
    }

    if (password.length < 6) {
      message.style.color = "red";
      message.textContent = "Password must be at least 6 characters.";
      return;
    }

    if (!/^\d{7,15}$/.test(phone)) {
      message.style.color = "red";
      message.textContent = "Phone number must be 7-15 digits.";
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // ✅ OTP তৈরি
      const otp = Math.floor(100000 + Math.random() * 900000);
      const fullName = firstName + " " + lastName;

      // ✅ EmailJS দিয়ে পাঠাও
      const params = {
        email: email,
        name: fullName,
        message: `Your OTP is: ${otp}`,
        time: new Date().toLocaleString()
      };

      emailjs.send("service_cwhsnkd", "template_g11jib9", params)
        .then(() => {
          message.style.color = "green";
          message.textContent = "Registration successful! OTP sent to your email ✅";
          setTimeout(() => {
            window.location.href = "login.html";
          }, 3000);
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          message.style.color = "orange";
          message.textContent = "Registered but OTP email failed!";
        });

    } catch (error) {
      message.style.color = "red";
      message.textContent = "Registration failed: " + error.message;
    }
  });
}

// ======================
// Login form handler
// ======================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.style.color = "green";
      message.textContent = "Login successful! Redirecting to dashboard... ✅";
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    } catch (error) {
      message.style.color = "red";
      message.textContent = "Login failed: " + error.message;
    }
  });
}

// ===========================
// ✅ Balance Tap Logic
// ===========================
const balanceBox = document.querySelector(".balance-box");

if (balanceBox) {
  let actualBalance = balanceBox.textContent.trim();
  balanceBox.textContent = "••••";

  balanceBox.addEventListener("click", () => {
    balanceBox.textContent = actualBalance;
    setTimeout(() => {
      balanceBox.textContent = "••••";
    }, 3000);
  });
}

// ===========================
// ✅ Deposit Modal Logic
// ===========================
function showDepositModal() {
  const modal = document.getElementById("depositModal");
  if (modal) {
    modal.style.display = "flex";
  }
}

function closeDepositModal() {
  const modal = document.getElementById("depositModal");
  if (modal) {
    modal.style.display = "none";
  }
}
window.showDepositModal = showDepositModal;
window.closeDepositModal = closeDepositModal;

// ✅ Show UID if user logged in
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
onAuthStateChanged(auth, user => {
  if (user && document.getElementById("userUid")) {
    document.getElementById("userUid").innerText = user.uid;
  }
});
