import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);

  // UseEffect should not continuously update state unless necessary
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const storedWatchlist =
        JSON.parse(localStorage.getItem(user.name))?.watchlist || [];
      setWatchlist(storedWatchlist);
    }
  }, []); // Empty dependency array, this runs only once on component mount

  if (watchlist.length === 0) return <div>Your watchlist is empty.</div>;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Your Watchlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {watchlist.map((movie, index) => (
          <div
            key={movie.imdbID || `${movie.imdbID}-${index}`} // Ensuring unique keys
            className="bg-gray-800 p-4 rounded-md"
          >
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
    </div>
  );
};

export default WatchlistPage;
