document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const clearBtn = document.getElementById('clearBtn');
  const searchInput = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('results');
  const loadingSpinner = document.getElementById('loadingSpinner');
  const resultsSection = document.getElementById('resultsSection');
  const noResults = document.getElementById('noResults');

  // create a movie card element from movie data
  function createMovieCard(movie) {
    const { title, poster_path, overview, release_date, vote_average } = movie;
    const card = document.createElement('div');
    card.className = 'bg-zinc-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 relative group';

    const poster = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : 'https://via.placeholder.com/500x750?text=No+Image';

    card.innerHTML = `
      <img src="${poster}" alt="${title}" class="w-full h-80 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-bold text-white truncate">${title}</h3>
        <p class="text-sm text-gray-400 mb-2">${release_date || 'unknown date'}</p>
        <p class="text-sm text-yellow-400 font-semibold mb-2">⭐ ${vote_average || 'n/a'}</p>
        <div class="absolute inset-0 bg-black bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity p-4 overflow-y-auto text-sm text-gray-300">
          ${overview || 'no description available.'}
        </div>
      </div>
    `;
    return card;
  }

  // fetch movies matching search query
  async function fetchSearchResults(query) {
    try {
      loadingSpinner.classList.remove('hidden');
      resultsContainer.innerHTML = '';
      noResults.classList.add('hidden');
      resultsSection.classList.remove('hidden');

      const response = await fetch(`/search_api?query=${encodeURIComponent(query)}`);
      const data = await response.json();

      loadingSpinner.classList.add('hidden');

      if (data.results && data.results.length > 0) {
        data.results.forEach(movie => {
          const card = createMovieCard(movie);
          resultsContainer.appendChild(card);
        });
      } else {
        noResults.classList.remove('hidden');
      }

    } catch (err) {
      console.error('error fetching search results:', err);
      loadingSpinner.classList.add('hidden');
      noResults.classList.remove('hidden');
    }
  }

  // handle search button click
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      fetchSearchResults(query);
    }
  });

  // trigger search on enter key press
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });

  // clear search input and results
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    resultsContainer.innerHTML = '';
    resultsSection.classList.add('hidden');
    noResults.classList.add('hidden');
  });
});