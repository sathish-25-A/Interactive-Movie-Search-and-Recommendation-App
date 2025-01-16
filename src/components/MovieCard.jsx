import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const MovieCard = ({ movie, onAddToWatchlist }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <Link to={`/movie/${movie.imdbID}`}> {/* Add Link here to navigate */}
        <img src={movie.Poster} alt={movie.Title} className="w-full h-48 object-cover rounded-lg mb-4" />
        <h3 className="text-white text-xl">{movie.Title}</h3>
        <p className="text-gray-400 text-sm">{movie.Year}</p>
      </Link>
      <button 
        onClick={() => onAddToWatchlist(movie)} 
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Add to Watchlist
      </button>
    </div>
  );
};

export default MovieCard;
