import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);  // Pass the query back to the parent component
    }
  };

  return (
    <div className="flex items-center justify-center p-4 bg-gray-800">
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-3/4 p-2 text-black rounded-l-md focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
