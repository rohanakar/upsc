import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
const SearchBar = ({ query, setQuery, onSearch }) => {
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        width: "95%",
        margin: "0 auto",
      }}
    >
      <input
        style={{
          height: "50px",
          width: "100%",
          borderRadius: "10px",
          border: "none",
          padding: "10px",
          marginBottom: "10px",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter your query..."
        required
      />
      <button
        style={{
          position: "absolute",
          right: "0",
          top: "10px",
          width: "50px",
          height: "50px",
          borderRadius: "10px",
          border: "none",
          padding: "10px",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "rgb(93, 90, 90)",
        }}
        type="submit"
      >
        <FaSearch
          style={{
            width: "20px",
            height: "20px",
            color: "rgba(255, 255, 255, 0.78)",
          }}
        />
      </button>
    </form>
  );
};

export default SearchBar;
