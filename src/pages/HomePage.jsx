import React, { useState, useEffect, useCallback } from "react";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";
import useAuth from "../hooks/useAuth"; // Remove 'login' from import since it's not used
import LoginModal from "../pages/LoginPage";

const HomePage = () => {
  const { isLoggedIn, user, updateWatchlist } = useAuth(); // Remove 'login' from destructuring
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const fetchMovies = useCallback(async (query) => {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=57fac967`
    );
    const data = await response.json();
    return data;
  }, []);

  const searchMovies = useCallback(async (query) => {
    setLoading(true);
    const data = await fetchMovies(query);
    setMovies(data?.Search || []);
    setLoading(false);
  }, [fetchMovies]);

  const handleAddToWatchlist = (movie) => {
    if (!isLoggedIn) {
      setShowLoginModal(true); // Prompt login if not logged in
    } else {
      // Add movie to the watchlist in the local user object
      const updatedWatchlist = [...user.watchlist, movie];
      updateWatchlist(updatedWatchlist); // Update the watchlist in both localStorage and React state
    }
  };

  useEffect(() => {
    if (query) {
      searchMovies(query);
    }
  }, [query, searchMovies]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SearchBar onSearch={setQuery} />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onAddToWatchlist={() => handleAddToWatchlist(movie)}
            />
          ))}
        </div>
      )}

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
