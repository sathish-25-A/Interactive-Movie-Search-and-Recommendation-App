import React from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <motion.div
      className="bg-gray-800 p-4 rounded-lg shadow-lg mt-4"
      whileHover={{ scale: 1.05 }} // Adds a hover zoom effect
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/movie/${movie.imdbID}`}>
        <motion.img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-48 object-cover rounded-lg mb-4"
          whileHover={{ scale: 1.1 }} // Hover effect for the image
          transition={{ type: "spring", stiffness: 300 }}
        />
        <h3 className="text-white text-xl">{movie.Title}</h3>
        <p className="text-gray-400 text-sm">{movie.Year}</p>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
