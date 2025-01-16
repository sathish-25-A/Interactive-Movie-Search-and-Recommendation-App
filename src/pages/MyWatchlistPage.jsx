import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { useWatchlist } from "../context/watchlist";
import MovieCard from "../components/MovieCard";

const MyWatchlistPage = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`);  // Navigate to the MovieDetailsPage with the movie id
  };

  const handleRemoveFromWatchlist = (id) => {
    removeFromWatchlist(id);  // Remove the movie from the watchlist
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {watchlist.length > 0 ? (
            watchlist.map((movie) => (
              <div key={movie.imdbID} className="relative">
                <MovieCard
                  movie={movie}
                  onClick={() => handleCardClick(movie.imdbID)}  // Add onClick for navigation
                />
                <button
                  onClick={() => handleRemoveFromWatchlist(movie.imdbID)}
                  className="absolute bottom-2 left-2 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Remove from Watchlist
                </button>
              </div>
            ))
          ) : (
            <p>Your watchlist is empty!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyWatchlistPage;
