import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa"; // Import heart icon

const Navbar = () => {
  const { user, logout } = useAuth(); // Access user from context

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-lg">
          Home
        </Link>
        
        <div className="flex items-center">
          <Link to="/watchlist">
            <FaHeart className="text-white text-2xl ml-4 hover:text-red-600" /> {/* Heart icon */}
          </Link>
          
          {user ? (
            <>
              <span className="text-white ml-4">Hello, {user.name}</span>
              <button
                onClick={logout}
                className="ml-4 bg-red-600 py-2 px-4 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="ml-4 text-white">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
