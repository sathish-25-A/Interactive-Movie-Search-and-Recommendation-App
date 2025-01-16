import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";
import useAuth from "../hooks/useAuth"; // Import the custom hook for authentication

const HomePage = () => {
  const { isLoggedIn, login, logout } = useAuth(); // Use the authentication hook
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Fetch movies from the OMDB API or another API
  const fetchMovies = async (query) => {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=57fac967`
    );
    const data = await response.json();
    return data;
  };

  const searchMovies = async (query) => {
    setLoading(true);
    const data = await fetchMovies(query);
    setMovies(data?.Search || []);
    setLoading(false);
  };

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

  useEffect(() => {
    if (query) {
      searchMovies(query);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Remove the Navbar here, as it's already in App.js */}

      <div className="container mx-auto px-4 py-10">
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
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg w-1/3">
            <h2 className="text-2xl text-white mb-4">Login</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            />
            <button
              onClick={() => {
                login("User", "password"); // Simplified login for this example
                setShowLoginModal(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
