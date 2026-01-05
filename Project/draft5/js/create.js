// this file manages the create session page
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// protect page
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'login.html';
    }
});

// random invite code
function generateInviteCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
    // Math.random() creates number like 0.123456789
    // .toString(36) converts to base-36 (letters + numbers)
    // .substring(2, 8) takes 6 characters
    // .toUpperCase() makes it like "ABC123"
}

// create session form
const createForm = document.getElementById('createSessionForm');

createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // GET plan name from form
    const title = document.getElementById('sessionTitle').value;
    const inviteCode = generateInviteCode();
    
    try {
        // ADD new session to firestore
        const sessionRef = await addDoc(collection(db, 'sessions'), {
            creatorId: auth.currentUser.uid,// current user as creator
            title: title,// session title
            inviteCode: inviteCode,// generated invite code
            status: 'voting',// initial status
            createdAt: serverTimestamp()// timestamp
        });
        
        // redirect to voting page with session id in url
        window.location.href = `vote.html?session=${sessionRef.id}`;
    } catch (error) {
        alert('Error creating session: ' + error.message);
    }
});