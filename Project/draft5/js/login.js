// this file handles user login using firebase authentication
import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // GET email and password from form
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        await signInWithEmailAndPassword(auth, email, password); // login user
        window.location.href = 'dashboard.html'; // redirect after login
    } catch (error) {
        loginError.textContent = 'Login failed: ' + error.message; // show error message
    }
});