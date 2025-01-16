import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWatchlist } from "../context/watchlist";
import LoginModal from "../pages/LoginPage"; // Import the LoginModal component

const MovieDetailsPage = () => {
  const { id } = useParams();
  const { addToWatchlist, removeFromWatchlist, watchlist } = useWatchlist();
  const [movie, setMovie] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const isInWatchlist = watchlist.some((m) => m.imdbID === id);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchMovieDetails = async (id) => {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=57fac967`);
    const data = await response.json();
    setMovie(data);
  };

  useEffect(() => {
    fetchMovieDetails(id);
  }, [id]);

  const handleWatchlist = () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else if (isInWatchlist) {
      removeFromWatchlist(id);
    } else {
      addToWatchlist(movie);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    addToWatchlist(movie); 
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false); 
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-64 h-96 object-cover rounded-md"
        />
        <div className="ml-6 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold">{movie.Title}</h1>
          <p className="text-gray-400">{movie.Genre}</p>
          <p className="mt-2">{movie.Plot}</p>

          <button
            onClick={handleWatchlist}
            className={`mt-4 px-4 py-2 rounded ${isInWatchlist ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
          >
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      </div>

      {/* Login modal */}
      {isLoginModalOpen && (
        <LoginModal
          onClose={handleCloseModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default MovieDetailsPage;
