const genreContainer = document.getElementById("genreContainer");
const recommendBtn = document.getElementById("recommendBtn");
const randomBtn = document.getElementById("randomBtn");
const resultsSection = document.getElementById("resultsSection");
const movieContainer = document.getElementById("movieContainer");
const noResults = document.getElementById("noResults");
const loadingSpinner = document.getElementById("loadingSpinner");
const numRecommendations = document.getElementById("numRecommendations");
const sortBySelect = document.getElementById("sortBy");
const refreshBtn = document.getElementById("refreshBtn");

let selectedGenres = [];
let tmdbGenres = {};
let lastMode = null;

// fetch genres from api and create buttons
async function fetchGenres() {
  try {
    const response = await fetch("/api/genres");
    const data = await response.json();
    data.genres.forEach(genre => {
      tmdbGenres[genre.id] = genre.name;
    });
    createGenreButtons();
  } catch (error) {
    console.error("failed to fetch genres:", error);
  }
}

// create buttons for each genre
function createGenreButtons() {
  genreContainer.innerHTML = "";
  const sortedGenres = Object.entries(tmdbGenres).sort((a, b) => a[1].localeCompare(b[1]));

  sortedGenres.forEach(([id, name]) => {
    const btn = document.createElement("button");
    btn.textContent = name;
    btn.dataset.id = id;
    btn.className = "genre-btn bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition";

    btn.addEventListener("click", () => {
      btn.classList.toggle("bg-red-800");
      btn.classList.toggle("text-white");
      btn.classList.toggle("border-2");
      btn.classList.toggle("border-black");

      if (selectedGenres.includes(id)) {
        selectedGenres = selectedGenres.filter(g => g !== id);
      } else {
        selectedGenres.push(id);
      }
    });

    genreContainer.appendChild(btn);
  });
}

// show loading spinner and clear previous results
function showLoading() {
  loadingSpinner.classList.remove("hidden");
  movieContainer.innerHTML = "";
  noResults.classList.add("hidden");
}

// hide loading spinner
function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

// fetch movies filtered by genres, sorted and limited by count
async function fetchMoviesByGenres(genreIds, count = 8, sortBy = "popularity.desc") {
  if (genreIds.length === 0) return [];
  const genreParam = genreIds.join(",");
  try {
    const response = await fetch(`/api/movies?genres=${genreParam}&sortBy=${sortBy}&page=1`);
    const data = await response.json();
    return data.results.slice(0, count);
  } catch (error) {
    console.error("failed to fetch movies by genres:", error);
    return [];
  }
}

// fetch random popular movies from a random page
async function fetchRandomMovies(count = 8) {
  try {
    const randomPage = Math.floor(Math.random() * 20) + 1;
    const response = await fetch(`/api/movies?genres=&sortBy=popularity.desc&page=${randomPage}`);
    const data = await response.json();
    const shuffled = data.results.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  } catch (error) {
    console.error("failed to fetch random movies:", error);
    return [];
  }
}

// get year from date string or return n/a
function getYear(dateString) {
  return dateString ? new Date(dateString).getFullYear() : "n/a";
}

// map genre ids to genre names
function mapGenreIdsToNames(genreIds) {
  return genreIds.map(id => tmdbGenres[id] || "unknown");
}

// display movies as cards with hover description
function displayMovies(movies) {
  movieContainer.innerHTML = "";
  if (movies.length === 0) {
    noResults.classList.remove("hidden");
    return;
  }
  noResults.classList.add("hidden");

  movies.forEach(movie => {
    const genresList = mapGenreIdsToNames(movie.genre_ids || []);
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "n/a";

    const card = document.createElement("div");
    card.className = "movie-card bg-zinc-800 rounded-lg p-4 relative overflow-hidden";
    card.innerHTML = `
      <div class="movie-poster-wrapper relative">
        <img src="${movie.poster_path ? "https://image.tmdb.org/t/p/w500" + movie.poster_path : "https://via.placeholder.com/500x750?text=No+Image"}" 
             alt="${movie.title} poster" class="movie-poster w-full h-auto rounded-lg mb-4" />
        <p class="movie-description text-sm text-gray-300 opacity-0 absolute top-0 left-0 right-0 px-4 py-2 bg-zinc-900 bg-opacity-75 transition-opacity duration-300 ease-in-out">
          ${movie.overview || "no description available."}
        </p>
      </div>
      <div class="movie-info mt-4">
        <h4 class="movie-title text-xl font-bold">${movie.title} <span class="movie-year text-gray-400">(${getYear(movie.release_date)})</span></h4>
        <div class="movie-rating text-yellow-400">⭐ ${rating}</div>
        <p class="movie-genres text-sm text-gray-400">${genresList.join(", ")}</p>
      </div>
    `;

    const posterWrapper = card.querySelector(".movie-poster-wrapper");
    const description = card.querySelector(".movie-description");

    // show description on hover
    posterWrapper.addEventListener("mouseenter", () => {
      description.classList.remove("opacity-0");
      description.classList.add("opacity-100");
    });

    // hide description when not hovered
    posterWrapper.addEventListener("mouseleave", () => {
      description.classList.remove("opacity-100");
      description.classList.add("opacity-0");
    });

    movieContainer.appendChild(card);
  });
}

// handle recommend button click
recommendBtn.addEventListener("click", async () => {
  if (selectedGenres.length === 0) {
    alert("please select at least one genre.");
    return;
  }

  lastMode = "recommend";
  resultsSection.classList.remove("hidden");
  showLoading();

  const count = parseInt(numRecommendations.value, 10);
  const sortBy = sortBySelect.value;

  const movies = await fetchMoviesByGenres(selectedGenres, count, sortBy);
  hideLoading();
  displayMovies(movies);
});

// handle random button click
randomBtn.addEventListener("click", async () => {
  lastMode = "random";
  resultsSection.classList.remove("hidden");
  showLoading();

  const count = parseInt(numRecommendations.value, 10);
  const movies = await fetchRandomMovies(count);

  hideLoading();
  displayMovies(movies);
});

// handle refresh button click, repeat last action
refreshBtn.addEventListener("click", async () => {
  if (!lastMode) {
    alert("please get recommendations or use 'surprise me' first.");
    return;
  }

  resultsSection.classList.remove("hidden");
  showLoading();

  const count = parseInt(numRecommendations.value, 10);

  if (lastMode === "recommend") {
    if (selectedGenres.length === 0) {
      alert("please select at least one genre first.");
      hideLoading();
      return;
    }

    const sortBy = sortBySelect.value;
    const movies = await fetchMoviesByGenres(selectedGenres, count, sortBy);
    hideLoading();
    displayMovies(movies);
  } else if (lastMode === "random") {
    const movies = await fetchRandomMovies(count);
    hideLoading();
    displayMovies(movies);
  }
});

// initialize genres on load
fetchGenres();