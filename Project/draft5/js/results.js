import { auth, db } from './js/firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

let sessionId = null;
let currentVoteCount = 0;
const API_KEY = '050e10fb491f474c20e03b7421aae916';

const urlParams = new URLSearchParams(window.location.search);
sessionId = urlParams.get('session');

if (!sessionId) {
    alert('No session found!');
    window.location.href = 'dashboard.html';
}

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = 'login.html';
    } else {
        await loadResults();
        //startLiveUpdates();
    }
});

// fetch movie title from TMDB API
async function getMovieTitle(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
        const data = await response.json();
        return data.title || `Movie ${movieId}`;
    } catch (error) {
        console.error('Error fetching movie title:', error);
        return `Movie ${movieId}`;
    }
}

async function loadResults() {
    try {
        const votesSnapshot = await getDocs(collection(db, 'sessions', sessionId, 'votes'));
        
        // did vote count change?
        if (votesSnapshot.size !== currentVoteCount) {
            currentVoteCount = votesSnapshot.size;
        }
        
        const movieVotes = {};
        const dateVotes = {};
        const cinemaVotes = {};
        
        // collect all votes
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
        
        // display results with vote bars
        await displayMovieResults(movieVotes, currentVoteCount);
        displayResults('Date', dateVotes, 'dateResults', currentVoteCount);
        displayResults('Cinema', cinemaVotes, 'cinemaResults', currentVoteCount);
        
        // Show winner announcement
        await displayWinnerAnnouncement(movieVotes, dateVotes, cinemaVotes);
        
        // update total votes
        document.getElementById('totalVotes').textContent = `Total Votes: ${currentVoteCount}`;
        
    } catch (error) {
        console.error('Error loading results:', error);
    }
}

// display movie results with API titles
async function displayMovieResults(votes, totalVotes) {
    const container = document.getElementById('movieResults');
    container.innerHTML = '';
    
    if (Object.keys(votes).length === 0) {
        container.innerHTML = '<p class="loading-text">No votes yet</p>';
        return;
    }
    
    // sort by vote count
    const sorted = Object.entries(votes).sort((a, b) => b[1] - a[1]);
    const maxVotes = sorted[0][1]; // Highest vote count for bar scaling
    
    // fetch movie titles and display
    for (let i = 0; i < sorted.length; i++) {
        const [movieId, count] = sorted[i];
        const movieTitle = await getMovieTitle(movieId);
        const percentage = ((count / totalVotes) * 100).toFixed(1);
        const barWidth = (count / maxVotes) * 100;
        const isWinner = i === 0;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = `result-item ${isWinner ? 'winner' : ''}`;
        itemDiv.innerHTML = `
            <div class="vote-bar" style="width: ${barWidth}%"></div>
            <span class="result-label">${movieTitle}</span>
            <span class="result-count">${count} votes (${percentage}%)</span>
        `;
        container.appendChild(itemDiv);
    }
}

// display regular results (dates, cinemas)
function displayResults(label, votes, elementId, totalVotes) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    
    if (Object.keys(votes).length === 0) {
        container.innerHTML = '<p class="loading-text">No votes yet</p>';
        return;
    }
    
    const sorted = Object.entries(votes).sort((a, b) => b[1] - a[1]);
    const maxVotes = sorted[0][1];
    
    sorted.forEach(([item, count], index) => {
        const percentage = ((count / totalVotes) * 100).toFixed(1);
        const barWidth = (count / maxVotes) * 100;
        const isWinner = index === 0;
        
        // format the dates nicely
        let displayItem = item;
        if (label === 'Date') {
            const date = new Date(item);
            displayItem = date.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
            });
        }
        const itemDiv = document.createElement('div');
        itemDiv.className = `result-item ${isWinner ? 'winner' : ''}`;
        itemDiv.innerHTML = `
            <div class="vote-bar" style="width: ${barWidth}%"></div>
            <span class="result-label">${displayItem}</span>
            <span class="result-count">${count} votes (${percentage}%)</span>
        `;
        container.appendChild(itemDiv);
    });
}

// display winner announcement at top
async function displayWinnerAnnouncement(movieVotes, dateVotes, cinemaVotes) {
    const container = document.getElementById('winnerAnnouncement');
    
    // do we have votes?
    if (Object.keys(movieVotes).length === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    
    // get winners
    const topMovie = Object.entries(movieVotes).sort((a, b) => b[1] - a[1])[0];
    const topDate = Object.entries(dateVotes).sort((a, b) => b[1] - a[1])[0];
    const topCinema = Object.entries(cinemaVotes).sort((a, b) => b[1] - a[1])[0];
    
    // fetch movie title
    const movieTitle = await getMovieTitle(topMovie[0]);
    
    // format date
    const date = new Date(topDate[0]);
    const formattedDate = date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric'
    });
    
    container.innerHTML = `
        <h2>🎉 The Plan is Set!</h2>
        <div class="winner-details">
            <div class="winner-item">
                <h3>Movie</h3>
                <p>🎬 ${movieTitle}</p>
            </div>
            <div class="winner-item">
                <h3>Date</h3>
                <p>📅 ${formattedDate}</p>
            </div>
            <div class="winner-item">
                <h3>Cinema</h3>
                <p>📍 ${topCinema[0]}</p>
            </div>
        </div>
    `;
}

// share functionality
const shareBtn = document.getElementById('shareResultsBtn');
if (shareBtn) {
    shareBtn.addEventListener('click', () => {
        const resultsUrl = `${window.location.origin}/results.html?session=${sessionId}`;
        
        navigator.clipboard.writeText(resultsUrl).then(() => {
            const message = document.getElementById('shareMessage');
            message.style.display = 'block';
            setTimeout(() => {
                message.style.display = 'none';
            }, 2000);
        }).catch(err => {
            alert('Failed to copy link. Please copy manually: ' + resultsUrl);
        });
    });
}