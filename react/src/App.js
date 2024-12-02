import React from "react";
import { FaLaugh, FaGhost, FaChild, FaBolt } from "react-icons/fa";

function App() {
  const categories = [
    { label: "Comedy", icon: FaLaugh },
    { label: "Horror", icon: FaGhost },
    { label: "PG", icon: FaChild },
    { label: "Action", icon: FaBolt },
  ];

  return (
    <div className="App" style={styles.container}>
      <h1 style={styles.title}>Movie Recommender</h1>
      <div style={styles.categoriesRow}>
        {categories.map((category, index) => (
          <div key={index} style={styles.categoryBox}>
            <category.icon size={50} color="blue" />
            <span style={styles.label}>{category.label}</span>
          </div>
        ))}
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
  },
  categoryBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  label: {
    marginTop: "10px",
    fontSize: "1rem",
    fontWeight: "500",
  },
};

export default App;
