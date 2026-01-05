// this file manages the join session page
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// protect page
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'login.html';
    }
});

// join session form
const joinForm = document.getElementById('joinSessionForm');
const joinError = document.getElementById('joinError');

joinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const inviteCode = document.getElementById('inviteCodeInput').value.toUpperCase().trim(); // GET invite code with uppercase, no spaces
    
    try {
        // search for session with this invite code
        const q = query(collection(db, 'sessions'), where('inviteCode', '==', inviteCode)); // QUERY = find session where inviteCode matches input
        const querySnapshot = await getDocs(q); // EXECUTE = run the query to get matching sessions
            console.log('Searching for code:', inviteCode);
            console.log('Found sessions:', querySnapshot.size);
        
        if (querySnapshot.empty) {
            joinError.textContent = 'Invalid invite code. Please check and try again!'; // HANDLE ERR = no matching session found
            return;
        }
        
        // get the session ID
        const sessionDoc = querySnapshot.docs[0]; // ASSUME = take the first matching session
        const sessionId = sessionDoc.id; // get session document ID
        
        // redirect to voting page
        window.location.href = `vote.html?session=${sessionId}`;
        
    } catch (error) {
        joinError.textContent = 'Error joining session: ' + error.message;
    }
});