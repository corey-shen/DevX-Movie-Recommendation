import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?title=${title}&genre=${genre}`);
      onSearch(response.data);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;