import React from "react";

const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-gray-800 text-white p-4 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-transform"
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-64 object-cover rounded-md"
      />
      <h3 className="mt-2 text-lg font-bold">{movie.Title}</h3>
      <p className="text-sm text-gray-400">{movie.Year}</p>
    </div>
  );
};

export default MovieCard;
