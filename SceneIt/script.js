const movieDatabase = {
  action: [
    { title: "Avengers: Endgame", description: "Earth's mightiest heroes unite for a final battle.", poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg" },
    { title: "The Dark Knight", description: "Batman faces the Joker in a gritty Gotham.", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
    { title: "Inception", description: "A thief who steals corporate secrets through dreams.", poster: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg" },
    { title: "Gladiator", description: "A Roman general seeks vengeance in the arena.", poster: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg" }
  ],
  comedy: [
    { title: "The Hangover", description: "A bachelor party gone very, very wrong.", poster: "https://image.tmdb.org/t/p/w500/uluhlXubGu1VxU63X9VHCLWDAYP.jpg" },
    { title: "Superbad", description: "Teen misadventures before graduation.", poster: "https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg" },
    { title: "21 Jump Street", description: "Two cops go undercover in high school.", poster: "https://image.tmdb.org/t/p/w500/8v3Sqv9UcIUC4ebmpKWROqPBINZ.jpg" },
    { title: "The Grand Budapest Hotel", description: "A quirky and stylish comedy adventure.", poster: "https://image.tmdb.org/t/p/w1280/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg" }
  ],
  drama: [
    { title: "The Shawshank Redemption", description: "Hope and friendship behind prison walls.", poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" },
    { title: "Forrest Gump", description: "A simple man's journey through American history.", poster: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg" },
    { title: "The Godfather", description: "A powerful crime family and their legacy.", poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" }
  ],
  horror: [
    { title: "Get Out", description: "A chilling social thriller.", poster: "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg" },
    { title: "It", description: "A terrifying clown haunts children in Derry.", poster: "https://image.tmdb.org/t/p/w500/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg" },
    { title: "The Conjuring", description: "Paranormal investigators face evil in a farmhouse.", poster: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg" }
  ],
  scifi: [
    { title: "Interstellar", description: "A journey through space to save humanity.", poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
    { title: "The Matrix", description: "A hacker discovers reality is a simulation.", poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg" },
    { title: "Avatar", description: "A marine on an alien world torn between duty and love.", poster: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg" }
  ],
  romance: [
    { title: "Titanic", description: "A romance aboard the ill-fated Titanic.", poster: "https://image.tmdb.org/t/p/w1280/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg" },
    { title: "La La Land", description: "Dreams and love in the city of stars.", poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg" },
    { title: "The Notebook", description: "A timeless love story through the years.", poster: "https://image.tmdb.org/t/p/w500/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg" }
  ],
  thriller: [
    { title: "Gone Girl", description: "A man becomes a suspect in his wife's disappearance.", poster: "https://image.tmdb.org/t/p/w500/qymaJhucquUwjpb8oiqynMeXnID.jpg" },
    { title: "Se7en", description: "Two detectives hunt a killer using the seven deadly sins.", poster: "https://image.tmdb.org/t/p/w500/69Sns8WoET6CfaYlIkHbla4l7nC.jpg" },
    { title: "Parasite", description: "A poor family's scheme unravels with deadly consequences.", poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" }
  ],
  animation: [
    { title: "Spirited Away", description: "A girl enters a world of spirits to save her parents.", poster: "https://image.tmdb.org/t/p/w500/oRvMaJOmapypFUcQqpgHMZA6qL9.jpg" },
    { title: "Toy Story", description: "Toys come to life when humans aren't around.", poster: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg" },
    { title: "Frozen", description: "A princess sets out to find her estranged sister.", poster: "https://image.tmdb.org/t/p/w1280/mbPrrbt8bSLcHSBCHnRclPlMZPl.jpg" }
  ]
};


const genres = [
  { name: "Action", icon: "fa-explosion" },
  { name: "Comedy", icon: "fa-face-laugh-squint" },
  { name: "Drama", icon: "fa-masks-theater" },
  { name: "Horror", icon: "fa-ghost" },
  { name: "Sci-Fi", icon: "fa-rocket" },
  { name: "Romance", icon: "fa-heart" },
  { name: "Thriller", icon: "fa-user-secret" },
  { name: "Animation", icon: "fa-film" }
];

const genreContainer = document.getElementById('genreContainer');
const recommendBtn = document.getElementById('recommendBtn');
const randomBtn = document.getElementById('randomBtn');
const refreshBtn = document.getElementById('refreshBtn');
const resultsSection = document.getElementById('resultsSection');
const movieContainer = document.getElementById('movieContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
const noResults = document.getElementById('noResults');

let selectedGenres = [];

function init() {
  renderGenreButtons();
  setupEventListeners();
}

function renderGenreButtons() {
  genreContainer.innerHTML = '';
  genres.forEach(genre => {
    const genreKey = genre.name.toLowerCase().replace(/[^a-z]/g, ''); // "Sci-Fi" -> "scifi"
    const button = document.createElement('button');
    button.className = 'genre-btn flex items-center px-4 py-2 rounded-full border border-gray-600 hover:bg-zinc-700 transition';
    button.innerHTML = `<i class="fas ${genre.icon} mr-2"></i>${genre.name}`;
    button.dataset.genre = genreKey;

    button.addEventListener('click', () => {
      button.classList.toggle('active');
      if (button.classList.contains('active')) {
        selectedGenres.push(genreKey);
      } else {
        selectedGenres = selectedGenres.filter(g => g !== genreKey);
      }
    });

    genreContainer.appendChild(button);
  });
}

function setupEventListeners() {
  recommendBtn.addEventListener('click', getRecommendations);
  randomBtn.addEventListener('click', getRandomRecommendations);
  refreshBtn.addEventListener('click', getRecommendations);
}

function getRecommendations() {
  if (selectedGenres.length === 0) {
    alert('Please select at least one genre');
    return;
  }

  showLoading();

  setTimeout(() => {
    const recommendations = [];
    selectedGenres.forEach(genre => {
      const genreMovies = movieDatabase[genre];
      if (genreMovies) {
        const shuffled = genreMovies.sort(() => 0.5 - Math.random());
        recommendations.push(...shuffled);
      }
    });

    displayRecommendations(recommendations);
  }, 1000);
}

function getRandomRecommendations() {
  showLoading();

  setTimeout(() => {
    const allMovies = Object.values(movieDatabase).flat();
    const shuffled = allMovies.sort(() => 0.5 - Math.random());
    const recommendations = shuffled

    displayRecommendations(recommendations);
  }, 1000);
}

function displayRecommendations(movies) {
  loadingSpinner.classList.add('hidden');
  movieContainer.innerHTML = '';
  resultsSection.classList.remove('hidden');

  if (movies.length === 0) {
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card bg-zinc-800 rounded-lg p-4 shadow-lg transition-transform';
    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}" class="w-full h-64 object-cover rounded-lg mb-4">
      <h4 class="text-xl font-semibold mb-2">${movie.title}</h4>
      <p class="text-gray-400 text-sm">${movie.description}</p>
    `;
    movieContainer.appendChild(card);
  });
}

function showLoading() {
  loadingSpinner.classList.remove('hidden');
  movieContainer.innerHTML = '';
  noResults.classList.add('hidden');
  resultsSection.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', init);