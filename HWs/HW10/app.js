import { logout, observeAuthState, signOut } from './auth.js';

const logoutBtn = document.getElementById("logout");
const messageDiv = document.getElementById("message");

// LOGOUT
logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
    console.log('logiut clicked');
    
});

observeAuthState((user) => {
    if (!user) {
        window.location.href = "index.html";
    }
});