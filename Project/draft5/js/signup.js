// this file creates new user accounts and saves them to firebase authentication
// it listens for form submission, gets user input, creates account, and handles errors

import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// GET form elements from html
const signupForm = document.getElementById('signupForm');
const signupError = document.getElementById('signupError');

// LISTEN for form submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent default form submission and page reload
    
    // GET user input values
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password); // create user
        await updateProfile(userCredential.user, { displayName: name }); // set display name
        window.location.href = 'dashboard.html'; // redirect after signup
    } catch (error) {
        signupError.textContent = 'Signup failed: ' + error.message; // show error message
    }
});