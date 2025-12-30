import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { doc, getDoc, collection, setDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const API_KEY = '050e10fb491f474c20e03b7421aae916';
let allMovieElements = []; // store all movie labels for searching
let moviesData = []; // store original movie data

// load popular movies from API to display as options
async function loadMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`); // FETCH = TMDB popular movies endpoint, ask API for data
        const data = await response.json(); // PARSE = JSON response, convert API response to usable format
        
        const moviesContainer = document.getElementById('moviesContainer');
        moviesContainer.innerHTML = '<h2>Pick Your Movies</h2>';
        
        allMovieElements = []; // clear previous movies
        moviesData = data.results.slice(0, 20); // store movie data, limit to 20
        
        moviesData.forEach(movie => {
            const label = document.createElement('label');
            label.className = 'movie-option'; // add class for styling
            label.dataset.genres = movie.genre_ids.join(','); // store genres on element
            
            // Build poster URL (TMDB base URL + size + poster path)
            const posterUrl = movie.poster_path 
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` 
                : 'assets/no-poster.jpg'; // Fallback if no poster
            
            label.innerHTML = `
                <input type="checkbox" name="movies" value="${movie.id}">
                <img src="${posterUrl}" alt="${movie.title}" class="movie-poster">
                <span class="movie-title">${movie.title}</span>
            `;// CREATE = checkbox for each movie, set value to movie ID and display title
            moviesContainer.appendChild(label);
            allMovieElements.push(label); // save reference
        });
        
        setupSearch(); // enable search after movies load
        setupFilters(); // enable filter buttons
        
    } catch (error) {
        console.error('Error loading movies:', error);
    }
}

// filter function that shows/hides movies based on genre buttons
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const genreId = button.dataset.genre; // get genre from button
            
            // remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // add active class to clicked button
            button.classList.add('active');
            
            // show all movies if "All" clicked
            if (genreId === 'all') {
                allMovieElements.forEach(label => {
                    label.style.display = 'block';
                });
                return;
            }
            
            // filter by genre
            allMovieElements.forEach(label => {
                const movieGenres = label.dataset.genres.split(',');
                
                // does this movie have the selected genre?
                if (movieGenres.includes(genreId)) {
                    label.style.display = 'block';
                } else {
                    label.style.display = 'none';
                }
            });
        });
    });
}

// search function that filters movies as user types
function setupSearch() {
    const searchBox = document.getElementById('movieSearch');
    
    searchBox.addEventListener('input', (e) => { // runs every time user types
        const searchText = e.target.value.toLowerCase(); // makes search case insensitive
        
        // filter movies based on search
        allMovieElements.forEach(label => {
            const movieTitle = label.textContent.toLowerCase();
            
            if (movieTitle.includes(searchText)) { // CHECK if title contains search text
                label.style.display = 'block';
            } else {
                label.style.display = 'none';
            }
        });
    });
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

// load session info from firestore
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
    
    // fetch selected values (***CUSTOMIZE BASED ON FORM***)
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