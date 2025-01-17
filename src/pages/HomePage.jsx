import React, { useState, useEffect, useCallback } from "react";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";
import useAuth from "../hooks/useAuth";
import LoginModal from "../pages/LoginPage";
import { fetchMovies } from "../services/movieApi";  // Assuming axios functions are in this file

const HomePage = () => {
  const { isLoggedIn, user, updateWatchlist } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreMovies, setHasMoreMovies] = useState(false);

  // States for filters
  const [genre, setGenre] = useState("");
  const [releaseRange, setReleaseRange] = useState(""); // e.g., "2000-2010"
  const [sortBy, setSortBy] = useState(""); // e.g., "Most Popular"

  // Filter function - needs to be declared before it is used
  const filterMovies = useCallback(
    (movies) => {
      return movies
        .filter((movie) => {
          // Filter by genre (if genre is set)
          if (genre && genre !== "") {
            const genres = movie.Genre ? movie.Genre.split(",") : [];
            return genres.some((g) => g.trim().toLowerCase() === genre.toLowerCase());
          }
          return true;
        })
        .filter((movie) => {
          // Filter by release range
          if (releaseRange) {
            const [startYear, endYear] = releaseRange.split("-").map(Number);
            const releaseYear = parseInt(movie.Year, 10);
            return releaseYear >= startYear && releaseYear <= endYear;
          }
          return true;
        })
        .sort((a, b) => {
          // Sort results
          if (sortBy === "Highest Rated") {
            return parseFloat(b.imdbRating) - parseFloat(a.imdbRating);
          }
          if (sortBy === "Latest") {
            return parseInt(b.Year, 10) - parseInt(a.Year, 10);
          }
          return 0; // Default (no sorting or "Most Popular")
        });
    },
    [genre, releaseRange, sortBy] // Dependencies
  );

  const searchMovies = useCallback(
    async (query, page = 1) => {
      setLoading(true);
      const data = await fetchMovies(query, page);
      if (data?.Response === "True") {
        const filteredMovies = filterMovies(data.Search || []);
        if (page === 1) {
          setMovies(filteredMovies);
          setHasMoreMovies(page * 10 < parseInt(data?.totalResults, 10));
        } else {
          setMovies((prevMovies) => [...prevMovies, ...filteredMovies]);
          setHasMoreMovies(page * 10 < parseInt(data?.totalResults, 10));
        }
      } else {
        setMovies([]);
        setHasMoreMovies(false);
      }
      setLoading(false);
    },
    [filterMovies] // Dependency
  );

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const handleAddToWatchlist = (movie) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      const updatedWatchlist = [...user.watchlist, movie];
      updateWatchlist(updatedWatchlist);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (query) {
      searchMovies(query, page);
    }
  }, [query, page, searchMovies]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap gap-4 items-center">
          <SearchBar onSearch={handleSearch} />
          <select
            className="bg-gray-800 text-white p-2 rounded"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            {/* Add more genres as needed */}
          </select>
          <select
            className="bg-gray-800 text-white p-2 rounded"
            value={releaseRange}
            onChange={(e) => setReleaseRange(e.target.value)}
          >
            <option value="">All Years</option>
            <option value="2000-2010">2000-2010</option>
            <option value="2011-2020">2011-2020</option>
            <option value="2021-2025">2021-2025</option>
          </select>
          <select
            className="bg-gray-800 text-white p-2 rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="Highest Rated">Highest Rated</option>
            <option value="Latest">Latest</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {movies.length === 0 && !loading && query && (
            <p className="text-center text-xl text-red-500 mt-4">
              No movies found. Please try a different search.
            </p>
          )}

          {movies.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  onAddToWatchlist={() => handleAddToWatchlist(movie)}
                />
              ))}
            </div>
          )}

          {hasMoreMovies && (
            <div className="text-center mt-6">
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default HomePage;
