// this file manages the dashboard page, shows user info,
// ensuring only authenticated users can access it
// and providing logout functionality

import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// protect page - redirect to login if not authenticated
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'login.html'; // redirect if not logged in
    } else {
        // display user info
        document.getElementById('userName').textContent = user.displayName || 'User';
        document.getElementById('userEmail').textContent = user.email;
    }
});

// logout functionality
document.getElementById('logoutBtn').addEventListener('click', async () => {
    await signOut(auth); // sign out user
    window.location.href = 'login.html'; // redirect to login
});