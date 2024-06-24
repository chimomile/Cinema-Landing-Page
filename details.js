document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const movieTitle = urlParams.get("title");

  fetch("movies.json")
    .then((response) => response.json())
    .then((data) => {
      const allMovies = data.nowPlaying.concat(data.upcoming);
      const movie = allMovies.find((m) => m.title === movieTitle);
      if (movie) {
        displayMovieDetails(movie);
      }
    })
    .catch((error) => console.error("Error fetching movie details:", error));
});

function displayMovieDetails(movie) {
  document.getElementById("movie-poster").innerHTML = `
        <a href="${movie.trailer}" target="_blank">
            <img src="${movie.poster}" alt="${movie.title}">
        </a>
    `;
  document.getElementById("movie-title").textContent = movie.title;
  document.getElementById("movie-synopsis").textContent = movie.synopsis;
  document.getElementById(
    "movie-duration"
  ).textContent = `Duration: ${movie.duration}`;
}

// Review System
document.addEventListener("DOMContentLoaded", () => {
    const reviewForm = document.getElementById("reviewForm");
    const reviewList = document.getElementById("reviewList");
  
    // Sample initial reviews
    const reviews = [
      {
        name: "Kanda Yow",
        rating: 5,
        comment: "Filmnya keren abies yoww, jadi gasabar untuk series selanjutnya!",
      },
      {
        name: "Pocy",
        rating: 4,
        comment: "Very good, will come again.",
      },
      {
        name: "Leann",
        rating: 2,
        comment: "Just OK and need room for improvement.",
      },
    ];
  
    // Function to render reviews
    function renderReviews() {
      reviewList.innerHTML = "";
      reviews.forEach((review) => {
        const reviewItem = document.createElement("div");
        reviewItem.classList.add("review-item");
        reviewItem.innerHTML = `
          <h3>${review.name}</h3>
          <div class="rating">${"★".repeat(review.rating)}${"☆".repeat(
          5 - review.rating
        )}</div>
          <p>${review.comment}</p>
        `;
        reviewList.appendChild(reviewItem);
      });
    }
  
    // Handle form submission
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      const rating = parseInt(e.target.rating.value);
      const comment = e.target.comment.value;
      reviews.push({ name, rating, comment });
      renderReviews();
      reviewForm.reset();
    });
  
    // Initial render
    renderReviews();
  });