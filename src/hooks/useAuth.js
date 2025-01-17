import { useState, useEffect } from "react";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  const login = (name, password) => {
    const userData = { name, password, watchlist: [] }; // Initialize with empty watchlist
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateWatchlist = (newMovie) => {
    const updatedUser = { ...user, watchlist: [...user.watchlist, newMovie] };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return { isLoggedIn, user, login, logout, updateWatchlist };
};

export default useAuth;
