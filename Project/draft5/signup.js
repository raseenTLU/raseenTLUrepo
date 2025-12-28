// import { auth } from './firebase-config.js';
// import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// console.log("Testing form:", document.getElementById('signupForm'));

// const signupForm = document.getElementById('signupForm');
// const signupError = document.getElementById('signupError');

import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const signupForm = document.getElementById('signupForm');
const signupError = document.getElementById('signupError');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        window.location.href = 'dashboard.html'; // redirect after signup
    } catch (error) {
        signupError.textContent = 'Signup failed: ' + error.message;
    }
});