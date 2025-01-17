import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      onSearch(input.trim()); // Pass the trimmed input query to the parent component
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full" aria-label="Search for movies">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 w-full rounded-l-md text-black border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
        placeholder="Search for movies..."
        aria-label="Movie search input"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition-colors"
        aria-label="Search"
        disabled={!input.trim()} // Disable button if the input is empty or just spaces
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
