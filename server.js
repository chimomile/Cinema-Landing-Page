const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const moviesFilePath = path.join(__dirname, "movies.json");

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Serve the details.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "details.html"));
});

app.get("/movies", (req, res) => {
  fs.readFile(moviesFilePath, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error reading movies file" });
    }
    const movies = JSON.parse(data);
    res.json(movies);
  });
});

app.post("/updateReviews", (req, res) => {
  const { title, reviews } = req.body;

  fs.readFile(moviesFilePath, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error reading movies file" });
    }

    const movies = JSON.parse(data);
    let movieFound = false;

    movies.nowPlaying.forEach((movie) => {
      if (movie.title === title) {
        movie.reviews = reviews;
        movieFound = true;
      }
    });

    if (!movieFound) {
      movies.upcoming.forEach((movie) => {
        if (movie.title === title) {
          movie.reviews = reviews;
          movieFound = true;
        }
      });
    }

    if (!movieFound) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }

    fs.writeFile(moviesFilePath, JSON.stringify(movies, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Error writing movies file" });
      }
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
