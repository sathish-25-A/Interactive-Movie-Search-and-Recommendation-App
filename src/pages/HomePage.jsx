import React, { useState, useEffect, useCallback } from "react";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";
import useAuth from "../hooks/useAuth"; // Import the custom hook for authentication
import LoginModal from "../pages/LoginPage"; // Corrected path for LoginModal

const HomePage = () => {
  const { isLoggedIn } = useAuth(); // Only get isLoggedIn since login/logout are not used
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Use useCallback to memoize searchMovies
  const fetchMovies = useCallback(async (query) => {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=57fac967`
    );
    const data = await response.json();
    return data;
  }, []);

  // Wrapping searchMovies in useCallback
  const searchMovies = useCallback(async (query) => {
    setLoading(true);
    const data = await fetchMovies(query);
    setMovies(data?.Search || []);
    setLoading(false);
  }, [fetchMovies]);

  const handleAddToWatchlist = (movie) => {
    if (!isLoggedIn) {
      setShowLoginModal(true); // Show login modal if not logged in
    } else {
      // Add to watchlist logic if logged in
      let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      watchlist.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false); // Close modal on login success
  };

  useEffect(() => {
    if (query) {
      searchMovies(query);
    }
  }, [query, searchMovies]); // Using searchMovies as dependency

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* SearchBar Component */}
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

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)} // Close modal
          onLoginSuccess={handleLoginSuccess} // Close modal after login success
        />
      )}
    </div>
  );
};

export default HomePage;
