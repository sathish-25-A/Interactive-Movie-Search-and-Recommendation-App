import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { fetchMovies } from "../services/movieApi";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const searchMovies = async (query) => {
    setLoading(true);
    const data = await fetchMovies(query, 1); // You can update pagination later
    setMovies(data?.Search || []);
    setLoading(false);
  };

  useEffect(() => {
    searchMovies(query);
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        {/* SearchBar Component */}
        <SearchBar onSearch={setQuery} />
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies?.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} onClick={() => {}} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
