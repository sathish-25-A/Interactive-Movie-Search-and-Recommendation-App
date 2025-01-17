import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoginModal from "../pages/LoginPage"; // Assuming you have a LoginModal component

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

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

    if (user) {
      const storedWatchlist = JSON.parse(localStorage.getItem(user.name))?.watchlist || [];
      const movieInWatchlist = storedWatchlist.some((movie) => movie.imdbID === id);
      setIsInWatchlist(movieInWatchlist);
    }
  }, [id, user]);

  const handleWatchlist = () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else if (isInWatchlist) {
      const updatedWatchlist = JSON.parse(localStorage.getItem(user.name))?.watchlist || [];
      const newWatchlist = updatedWatchlist.filter((movie) => movie.imdbID !== id);
      localStorage.setItem(user.name, JSON.stringify({ ...user, watchlist: newWatchlist }));
      setIsInWatchlist(false);
    } else {
      const updatedWatchlist = JSON.parse(localStorage.getItem(user.name))?.watchlist || [];
      updatedWatchlist.push(movie);
      localStorage.setItem(user.name, JSON.stringify({ ...user, watchlist: updatedWatchlist }));
      setIsInWatchlist(true);
    }
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

          <button
            onClick={handleWatchlist}
            className={`mt-4 px-4 py-2 rounded ${
              isInWatchlist ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      </div>

      {/* Login modal */}
      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={() => setIsLoginModalOpen(false)} // Handle login success if needed
        />
      )}
    </div>
  );
};

export default MovieDetailsPage;
