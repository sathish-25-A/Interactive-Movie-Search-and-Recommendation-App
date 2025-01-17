import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

const WatchlistPage = () => {
  const { user } = useAuth(); // Access the user from AuthContext
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const storedWatchlist = JSON.parse(localStorage.getItem(user.name))?.watchlist || [];
      setWatchlist(storedWatchlist);
    } else {
      setWatchlist([]); // Clear the watchlist when the user logs out
    }
  }, [user]); // Add user as a dependency

  if (!user) {
    return (
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Your Watchlist</h1>
        <p>Please log in to view your watchlist.</p>
      </div>
    );
  }

  if (watchlist.length === 0) {
    return (
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Your Watchlist</h1>
        <p>Your watchlist is empty.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 bg-gray-900 text-white min-h-screen"
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <h1 className="text-3xl font-bold mb-4">Your Watchlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {watchlist.map((movie) => (
          <div key={movie.imdbID} className="bg-gray-800 p-4 rounded-md">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-2">{movie.Title}</h2>
            <p className="text-gray-400">{movie.Genre}</p>
            <p className="mt-2">{movie.Plot}</p>
            <Link
              to={`/movie/${movie.imdbID}`}
              state={{ movie }}
              className="text-blue-500 mt-4 block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WatchlistPage;
