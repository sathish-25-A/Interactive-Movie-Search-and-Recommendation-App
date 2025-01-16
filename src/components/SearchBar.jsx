// src/components/SearchBar.jsx
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(input); // Pass the input query to the parent component
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 w-full rounded-l-md text-black"
        placeholder="Search for movies..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-r-md"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
