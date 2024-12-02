import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const userId = 1; // Replace with actual user ID

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`/api/favorites?userId=${userId}`);
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
    fetchFavorites();
  }, [userId]);

  const handleAddToFavorites = async (movieId) => {
    try {
      await axios.post('/api/favorites', { userId, movieId });
      setFavorites([...favorites, { userId, movieId }]);
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
    }
  };

  return (
    <div>
      <h2>Favorite Movies</h2>
      {favorites.map((favorite) => (
        <div key={favorite.movieId}>
          {/* Movie details */}
          <button onClick={() => handleAddToFavorites(favorite.movieId)}>
            Remove from Favorites
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoritesPage;