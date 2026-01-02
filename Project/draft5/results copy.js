import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

let sessionId = null;
let currentVoteCount = 0; // track how many votes we have

const urlParams = new URLSearchParams(window.location.search);
sessionId = urlParams.get('session');

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = 'login.html';
    } else {
        await loadResults(); // load initial results
        startLiveUpdates(); // start checking for updates
    }
});

onAuthStateChanged(auth, async (user) => {
    // i removed the redirect to allow anyone to view
    // intially protected by if (!user) then redirect to login.html
    await loadResults();
    startLiveUpdates();
});

// load results from firestore and display them on page
async function loadResults() {
    try {
        const votesSnapshot = await getDocs(collection(db, 'sessions', sessionId, 'votes'));
        
        // check if vote count changed
        if (votesSnapshot.size !== currentVoteCount) {
            currentVoteCount = votesSnapshot.size;
            showUpdateNotification(); // show update notification
        }
        
        const movieVotes = {};
        const dateVotes = {};
        const cinemaVotes = {};
        
        votesSnapshot.forEach((voteDoc) => {
            const vote = voteDoc.data();
            
            vote.moviePreferences.forEach(movie => {
                movieVotes[movie] = (movieVotes[movie] || 0) + 1;
            });
            
            vote.availableDates.forEach(date => {
                dateVotes[date] = (dateVotes[date] || 0) + 1;
            });
            
            vote.cinemaPreferences.forEach(cinema => {
                cinemaVotes[cinema] = (cinemaVotes[cinema] || 0) + 1;
            });
        });
        
        displayResults('Movie', movieVotes, 'movieResults');
        displayResults('Date', dateVotes, 'dateResults');
        displayResults('Cinema', cinemaVotes, 'cinemaResults');
        
        // show total votes
        document.getElementById('totalVotes').textContent = `Total Votes: ${currentVoteCount}`;
        
    } catch (error) {
        console.error('Error loading results:', error);
    }
}

// display results in given container element with given votes object,
// parameterized by label for clarity and elementId
function displayResults(label, votes, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    
    const sorted = Object.entries(votes).sort((a, b) => b[1] - a[1]);
    
    if (sorted.length === 0) {
        container.innerHTML = '<p>No votes yet</p>';
        return;
    }
    
    sorted.forEach(([item, count]) => {
        const p = document.createElement('p');
        p.textContent = `${item}: ${count} votes`;
        container.appendChild(p);
    });
}

// live updates on results page
function startLiveUpdates() {
    // check for updates
    setInterval(async () => {
        await loadResults();
    }, 5000); // every 5 seconds
    
    console.log('Live updates enabled (every 5 seconds)');
}

// show notification for new votes received
function showUpdateNotification() {
    const notification = document.getElementById('updateNotification');
    if (notification) {
        notification.style.display = 'block';
        notification.textContent = 'New votes received!';
        
        // hide notification
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000); // after 3 seconds
    }
}

// share functionality
const shareBtn = document.getElementById('shareResultsBtn');
if (shareBtn) {
    shareBtn.addEventListener('click', () => {
        const resultsUrl = `${window.location.origin}/results.html?session=${sessionId}`;
        
        // copy to clipboard
        navigator.clipboard.writeText(resultsUrl).then(() => {
            const message = document.getElementById('shareMessage');
            message.style.display = 'block';
            setTimeout(() => {
                message.style.display = 'none';
            }, 2000);
        });
    });
}