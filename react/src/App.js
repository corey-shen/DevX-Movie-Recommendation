import React, { useState } from "react";
import CategoryBox from "./components/CategoryBox";
import { FaLaugh, FaGhost, FaChild, FaBolt } from "react-icons/fa";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    { label: "Comedy", icon: FaLaugh },
    { label: "Horror", icon: FaGhost },
    { label: "PG", icon: FaChild },
    { label: "Action", icon: FaBolt },
  ];

  const fetchMovies = async (category) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Fetching movies for category:", category); // Debug log
      const response = await fetch(
        `http://localhost:5001/api/search?genre=${category}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Received data:", data); // Debug log
      
      if (Array.isArray(data)) {
        setMovies(data);
      } else {
        setError("Invalid data received from server");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryClick = (label) => {
    setSelectedCategory((prev) => (prev === label ? "" : label));
    if (selectedCategory !== label) {
      fetchMovies(label);
    }
  };

  return (
    <div className="App" style={styles.container}>
      <h1 style={styles.title}>Movie Recommender</h1>
      <div style={styles.categoriesRow}>
        {categories.map((category, index) => (
          <CategoryBox
            key={index}
            icon={category.icon}
            label={category.label}
            selected={selectedCategory === category.label}
            onClick={() => handleCategoryClick(category.label)}
          />
        ))}
      </div>
      <div style={styles.moviesList}>
        {isLoading && <p>Loading movies...</p>}
        {error && <p style={styles.error}>Error: {error}</p>}
        {!isLoading && !error && movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} style={styles.movieCard}>
              <img
                src={movie.poster}
                alt={movie.title}
                style={styles.moviePoster}
              />
              <h3 style={styles.movieTitle}>{movie.title}</h3>
              <p style={styles.movieDate}>{movie.release_date}</p>
            </div>
          ))
        ) : (
          <p style={styles.noMovies}>
            {selectedCategory
              ? "No movies found."
              : "Select a category to see recommendations."}
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  categoriesRow: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    maxWidth: "800px",
    marginBottom: "2rem",
  },
  moviesList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  movieCard: {
    width: "200px",
    textAlign: "center",
  },
  moviePoster: {
    width: "100%",
    borderRadius: "10px",
  },
  noMovies: {
    fontSize: "1.2rem",
    color: "#666",
  },
};

export default App;
