import React from "react";

const Header = ({ isAdmin, toggleAdmin }) => {
  return (
    <header style={styles.header}>
      <h1>Intelligent Knowledge Management System</h1>
      <button onClick={toggleAdmin} style={styles.button}>
        {isAdmin ? "Switch to User" : "Switch to Admin"}
      </button>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #dee2e6",
  },
  button: {
    padding: "5px 10px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Header;
