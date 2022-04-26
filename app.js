const API_KEY = "ab5657f946b443698b6c48c865b7e82d";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w185";

const trendingMoviesWrapper = document.querySelector(
  ".trending-movies-wrapper"
);
const recommendedMoviesWrapper = document.querySelector(
  ".recommended-movies-wrapper"
);

const links = document.querySelectorAll(".menu a");

links.forEach((link) => {
  const path = link.href;

  if (path === window.location.href) {
    link.classList.add("active");
  }
});

const trendingMovieItemTemplete = (movie) => {
  return `
    <div class="trending-movies-item" style="background-image: url(${
      IMG_BASE_URL + movie.poster_path
    })">
        <div class="overlay"></div>
        <div class="bookmark-wrapper">
        <button class="bookmark-btn">
            <img src="../assets/svg/bookmark.svg" alt="Bookmark" />
        </button>
        </div>

        <div class="movie-details">
        <p class="ycr">
            <span class="year">
                ${
                  movie.media_type === "tv"
                    ? movie.first_air_date
                    : movie.release_date
                }
            </span>
            <span class="dot"></span>
            <span class="category">${
              movie.media_type === "tv" ? "TV" : "Movie"
            } </span>
            <span class="dot"></span>
            <span class="rating">${movie.adult ? "" : "PG"}</span>
        </p>

        <p class="title">${
          movie.media_type === "tv" ? movie.name : movie.title
        }</p>
        </div>
    </div>
    `;
};

const recommendedMovieItemTemplete = (movie) => {
  return `
        <div class="grid-item">
            <div class="recommended-movies-item" style="background-image: url(${
              IMG_BASE_URL + movie.poster_path
            })">
            <div class="overlay"></div>
            <div class="bookmark-wrapper">
                <button class="bookmark-btn">
                <img src="../assets/svg/bookmark.svg" alt="Bookmark" />
                </button>
            </div>
            </div>

            <div class="movie-details">
            <p class="ycr">
                <span class="year">${movie.release_date}</span>
                <span class="dot"></span>
                <span class="category">Movie</span>
                <span class="dot"></span>
                <span class="rating">${movie.adult ? "" : "PG"}</span>
            </p>

            <p class="title">${movie.title}</p>
            </div>
        </div>
    `;
};

const fetchTrendingMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
  );

  const data = await response.json();

  let htmlString = [];

  data.results.forEach((movie) => {
    htmlString.push(trendingMovieItemTemplete(movie));
  });

  trendingMoviesWrapper.innerHTML = htmlString.join("");
};

const fetchRecommendedMovies = async () => {
  const response = await fetch(
    `
        https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );

  const data = await response.json();

  console.log(data);

  let htmlString = [];

  data.results.forEach((movie) => {
    htmlString.push(recommendedMovieItemTemplete(movie));
  });

  recommendedMoviesWrapper.innerHTML = htmlString.join("");
};

fetchTrendingMovies();

fetchRecommendedMovies();
