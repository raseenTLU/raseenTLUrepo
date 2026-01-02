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
}

// create session form
const createForm = document.getElementById('createSessionForm');

createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('sessionTitle').value;
    const inviteCode = generateInviteCode();
    
    try {
        const sessionRef = await addDoc(collection(db, 'sessions'), {
            creatorId: auth.currentUser.uid,
            title: title,
            inviteCode: inviteCode,
            status: 'voting',
            createdAt: serverTimestamp()
        });
        
        // redirect to voting page with session#
        window.location.href = `vote.html?session=${sessionRef.id}`;
    } catch (error) {
        alert('Error creating session: ' + error.message);
    }
});