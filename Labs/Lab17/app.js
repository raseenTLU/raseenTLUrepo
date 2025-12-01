import {logout} from './auth.js';
import { readEntries } from "./firestore.js";
const logoutBtn = document.querySelector("#logout");
const messageDiv = document.getElementById("message");

logoutBtn.addEventListener('click', async ()=> {
    try {
        await logout();
        window.location.href = "index.html";
    }
    catch (error) {
        console.error("Logout failed", error);
        messageDiv.textContent = "Logout failed: " + error.message;
    }
})

