import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

let sessionId = null;

// fetch session ID from URL
const urlParams = new URLSearchParams(window.location.search);
sessionId = urlParams.get('session');

// protect page
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = 'login.html';
    } else {
        await loadResults();
    }
});

async function loadResults() {
    try {
        // get all votes
        const votesSnapshot = await getDocs(collection(db, 'sessions', sessionId, 'votes'));
        
        const movieVotes = {};
        const dateVotes = {};
        const cinemaVotes = {};
        
        // count votes
        votesSnapshot.forEach((voteDoc) => {
            const vote = voteDoc.data();
            
            // count movies
            vote.moviePreferences.forEach(movie => {
                movieVotes[movie] = (movieVotes[movie] || 0) + 1;
            });
            
            // count dates
            vote.availableDates.forEach(date => {
                dateVotes[date] = (dateVotes[date] || 0) + 1;
            });
            
            // count cinemas
            vote.cinemaPreferences.forEach(cinema => {
                cinemaVotes[cinema] = (cinemaVotes[cinema] || 0) + 1;
            });
        });
        
        // display results
        displayResults('Movie', movieVotes, 'movieResults');
        displayResults('Date', dateVotes, 'dateResults');
        displayResults('Cinema', cinemaVotes, 'cinemaResults');
        
    } catch (error) {
        console.error('Error loading results:', error);
    }
}

function displayResults(label, votes, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    
    // sort by most votes
    const sorted = Object.entries(votes).sort((a, b) => b[1] - a[1]);
    
    sorted.forEach(([item, count]) => {
        const p = document.createElement('p');
        p.textContent = `${item}: ${count} votes`;
        container.appendChild(p);
    });
}