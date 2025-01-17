import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion from framer-motion
import LoginModal from "../pages/LoginPage";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const fetchMovieDetails = async (id) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=57fac967`);
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    fetchMovieDetails(id);

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const storedWatchlist = JSON.parse(localStorage.getItem(user.name))?.watchlist || [];
      const movieInWatchlist = storedWatchlist.some((movie) => movie.imdbID === id);
      setIsInWatchlist(movieInWatchlist);
    }
  }, [id]);

  const handleWatchlist = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    const userWatchlist = JSON.parse(localStorage.getItem(user.name))?.watchlist || [];
    if (isInWatchlist) {
      // Remove movie from watchlist
      const updatedWatchlist = userWatchlist.filter((movie) => movie.imdbID !== id);
      localStorage.setItem(user.name, JSON.stringify({ ...user, watchlist: updatedWatchlist }));
      setIsInWatchlist(false);
    } else {
      // Add movie to watchlist
      userWatchlist.push(movie);
      localStorage.setItem(user.name, JSON.stringify({ ...user, watchlist: userWatchlist }));
      setIsInWatchlist(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const storedWatchlist = JSON.parse(localStorage.getItem(user.name))?.watchlist || [];
      if (!storedWatchlist.some((movie) => movie.imdbID === id)) {
        storedWatchlist.push(movie);
        localStorage.setItem(user.name, JSON.stringify({ ...user, watchlist: storedWatchlist }));
        setIsInWatchlist(true);
      }
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <motion.div
      className="p-6 bg-gray-900 text-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center">
        <motion.img
          src={movie.Poster}
          alt={movie.Title}
          className="w-64 h-96 object-cover rounded-md"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <div className="ml-6 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold">{movie.Title}</h1>
          <p className="text-gray-400">Genre: {movie.Genre}</p>
          <p className="text-gray-400">Actors: {movie.Actors}</p>
          <p className="text-gray-400">Release Date: {movie.Released}</p>
          <p className="text-gray-400">Director: {movie.Director}</p>
          <p className="mt-4">{movie.Plot}</p>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Ratings:</h2>
            {movie.Ratings.map((rating, index) => (
              <p key={index} className="text-gray-400">
                {rating.Source}: {rating.Value}
              </p>
            ))}
          </div>

          <motion.button
            onClick={handleWatchlist}
            className={`mt-4 px-4 py-2 rounded ${
              isInWatchlist ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
            }`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </motion.button>
        </div>
      </div>

      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </motion.div>
  );
};

export default MovieDetailsPage;