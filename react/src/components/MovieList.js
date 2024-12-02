import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.imdbID}>
          <img src={movie.Poster} alt={movie.Title} />
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
          <Link to={`/movie/${movie.imdbID}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
