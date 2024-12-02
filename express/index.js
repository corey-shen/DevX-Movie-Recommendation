const express = require("express");
const bodyParser = require('body-parser');
const axios = require("axios");
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const route = express.Router();
const port = process.env.PORT || 5001;
app.use('/api', route);
app.listen(port, () => {    
  console.log(`Server listening on port ${port}`);
});

// Database connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'movie_finder',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

// Search movies
route.get('/search', async (req, res) => {
  const { title, genre } = req.query;
  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=YOUR_API_KEY&s=${title || ''}&type=movie`);
    let movies = response.data.Search;
    if (genre) {
      movies = movies.filter(movie =>
        movie.Genre && movie.Genre.toLowerCase().includes(genre.toLowerCase())
      );
    }
    res.json(movies || []);
  } catch (error) {
    res.status(500).send('Error fetching movies');
  }
});


// Get movie details
route.get('/movie/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=YOUR_API_KEY&i=${movieId}&plot=full`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching movie details');
  }
});

// Favorite movies CRUD
route.post('/favorites', (req, res) => {
  const { userId, movieId } = req.body;
  const query = 'INSERT INTO favorites (user_id, movie_id) VALUES (?, ?)';
  db.query(query, [userId, movieId], (err, result) => {
    if (err) {
      return res.status(500).send('Error adding movie to favorites');
    }
    res.status(200).send('Movie added to favorites');
  });
});

// Additional favorite movies routes (get, update, delete) omitted for brevity