import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Ensure this is correctly handling auth
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import WatchlistPage from "./pages/WatchlistPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} /> {/* Dynamic Route for Movie Details */}
          <Route path="/watchlist" element={<WatchlistPage />} /> {/* Route for Watchlist Page */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
