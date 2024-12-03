const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

app.get("/api/search", async (req, res) => {
  const { genre } = req.query;

  try {
    const genreMap = {
      Comedy: 35,
      Horror: 27,
      Action: 28,
      PG: 10751,
    };
    const genreId = genreMap[genre];

    if (!genreId) {
      return res.status(400).json({ error: "Invalid genre" });
    }

    console.log('TMDB API Key:', process.env.TMDB_API_KEY ? 'Present' : 'Missing'); // Debug log
    console.log('Making request to TMDB for genre:', genre, 'genreId:', genreId); // Debug log
    // Improved API call with error handling and timeout
    const response = await axios({
      method: 'get',
      url: `${TMDB_BASE_URL}/discover/movie`,
        params: {
          api_key: TMDB_API_KEY,
          with_genres: genreId,
          sort_by: "popularity.desc",
          language: "en-US",
        page: 1, // Add pagination
        include_adult: false // Ensure family-friendly content
        },
      timeout: 5000 // 5 second timeout
    });

    if (!response.data || !response.data.results) {
      throw new Error('Invalid response from TMDB API');
      }

    const movies = response.data.results
      .filter(movie => movie.poster_path) // Only include movies with posters
      .map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      release_date: movie.release_date,
    }));

    console.log('Successfully fetched and processed movies:', movies.length); // Debug log
    res.json(movies);
  } catch (error) {
    console.error("Detailed error:", error); // More detailed error logging
    console.error("Error response:", error.response?.data); // Log API error response if available
    res.status(500).json({ 
      error: "Failed to fetch movies",
      message: error.message,
      details: error.response?.data // Include API error details if available
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
