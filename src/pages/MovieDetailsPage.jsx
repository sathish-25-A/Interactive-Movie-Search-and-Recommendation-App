import React from "react";
import { useWatchlist } from "../context/watchlist";

const MovieDetailsPage = ({ movie }) => {
  const { addToWatchlist, removeFromWatchlist, watchlist } = useWatchlist();

  const isInWatchlist = watchlist.some((m) => m.imdbID === movie.imdbID);

  const handleWatchlist = () => {
    if (isInWatchlist) {
      removeFromWatchlist(movie.imdbID);
    } else {
      addToWatchlist(movie);
    }
  };

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
            className={`mt-4 px-4 py-2 rounded ${
              isInWatchlist
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
