import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { doc, getDoc, collection, setDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const API_KEY = '050e10fb491f474c20e03b7421aae916';

// load popular movies from API
async function loadMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`); // FETCH = TMDB popular movies endpoint, ask API for data
        const data = await response.json(); // PARSE = JSON response, convert API response to usable format
        
        const moviesContainer = document.getElementById('moviesContainer');
        moviesContainer.innerHTML = '<h2>Pick Your Movies</h2>';
        
        // show first 10 movies
        data.results.slice(0, 10).forEach(movie => { // LOOP = go through each movie in results, limit to 10
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="checkbox" name="movies" value="${movie.id}">
                ${movie.title}
            `; // CREATE = checkbox for each movie, set value to movie ID and display title
            moviesContainer.appendChild(label);
        });
    } catch (error) {
        console.error('Error loading movies:', error);
    }
}

let sessionId = null;

// fetch session ID from URL
const urlParams = new URLSearchParams(window.location.search);
sessionId = urlParams.get('session');

if (!sessionId) {
    alert('No session found!');
    window.location.href = 'dashboard.html';
}

// protect page
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = 'login.html';
    } else {
        await loadSessionInfo();
        await loadMovies();
    }
});

// load session info
async function loadSessionInfo() {
    try {
        const sessionDoc = await getDoc(doc(db, 'sessions', sessionId));
        if (sessionDoc.exists()) {
            const data = sessionDoc.data();
            document.getElementById('sessionTitle').textContent = data.title;
            document.getElementById('inviteCode').textContent = data.inviteCode;
        }
    } catch (error) {
        console.error('Error loading session:', error);
    }
}

// submit vote
const voteForm = document.getElementById('voteForm');

voteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // fetch selected values (***customize this based on form***)
    const selectedMovies = Array.from(document.querySelectorAll('input[name="movies"]:checked'))
        .map(cb => cb.value);
    const selectedDates = Array.from(document.querySelectorAll('input[name="dates"]:checked'))
        .map(cb => cb.value);
    const selectedCinemas = Array.from(document.querySelectorAll('input[name="cinemas"]:checked'))
        .map(cb => cb.value);
    
    try {
        // save vote to firestore
        await setDoc(doc(db, 'sessions', sessionId, 'votes', auth.currentUser.uid), {
            userId: auth.currentUser.uid,
            userName: auth.currentUser.displayName,
            moviePreferences: selectedMovies,
            availableDates: selectedDates,
            cinemaPreferences: selectedCinemas,
            submittedAt: new Date()
        });
        
        alert('Vote submitted!');
        window.location.href = `results.html?session=${sessionId}`;
    } catch (error) {
        alert('Error submitting vote: ' + error.message);
    }
});