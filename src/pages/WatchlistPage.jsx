import React from "react";

const WatchlistPage = () => {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  return (
    <div className="watchlist-page">
      <h1>Your Watchlist</h1>
      {watchlist.length > 0 ? (
        <ul>
          {watchlist.map((movie) => (
            <li key={movie.id}>
              <h2>{movie.title}</h2>
              <img src={movie.poster} alt={movie.title} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Your watchlist is empty.</p>
      )}
    </div>
  );
};

export default WatchlistPage;
