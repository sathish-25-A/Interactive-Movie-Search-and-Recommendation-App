import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth(); // Access user from context

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-lg">
          Home
        </Link>
        
        <div className="text-white">
          {user ? (
            <>
              <span>Hello, {user.name}</span>
              <button
                onClick={logout}
                className="ml-4 bg-red-600 py-2 px-4 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="ml-4">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
