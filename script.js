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
  storageBucket: "instacash-e1d5d.firebasestorage.app",
  messagingSenderId: "123825323751",
  appId: "1:123825323751:web:624eea7c7a733cda2d6c42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ======================
// Country Select Dropdown Logic
// ======================
function toggleDropdown(e) {
  e.stopPropagation();
  const menu = document.getElementById("country-dropdown");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function selectCountry(country) {
  document.getElementById("selected-country").innerHTML = country + ' <i class="fas fa-chevron-down"></i>';
  document.getElementById("country-dropdown").style.display = "none";
}

document.addEventListener("click", function(event) {
  const dropdown = document.getElementById("country-dropdown");
  if (!document.querySelector(".country-select").contains(event.target)) {
    dropdown.style.display = "none";
  }
});

// ======================
// Country code display (if you still use country select with <select> tag)
// ======================
// If you have country <select> and want to update code span
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
    // If you want country code from dropdown, get from selected-country text or other input
    // For now just set a variable if needed.
    const countryCode = "Example Code"; // Adjust this to your logic if needed
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
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

    const fullPhone = countryCode + phone;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      message.style.color = "green";
      message.textContent = "Registration Successful! Redirecting to login... ✅";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
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
// ✅ Balance Tap Logic Here
// ===========================
const balanceBox = document.querySelector(".balance-box");

if (balanceBox) {
  let actualBalance = balanceBox.textContent.trim(); // Save the real balance
  balanceBox.textContent = "••••"; // Initially hidden

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

// Optional: Expose modal functions to global scope
window.showDepositModal = showDepositModal;
window.closeDepositModal = closeDepositModal;
