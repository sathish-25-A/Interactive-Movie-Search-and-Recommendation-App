import React from "react";
import { useWatchlist } from "../context/watchlist";
import MovieCard from "../components/MovieCard";

const MyWatchlistPage = () => {
  const { watchlist } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <div className="p-6 bg-gray-900 text-white min-h-screen text-center">
        <h2 className="text-xl font-bold">Your Watchlist is Empty</h2>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">My Watchlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {watchlist.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MyWatchlistPage;
