import { logout, observeAuthState } from './auth.js';

const logoutBtn = document.getElementById("logout");

// LOGOUT BUTTON
logoutBtn.addEventListener("click", async () => {
    try {
        await logout();
    } catch (error) {
        console.log(error);
    }
});

// OBSERVE AUTHENTICATION STATE
observeAuthState((user) => {
    if (!user) {
        window.location.href = "index.html";
    }
});
