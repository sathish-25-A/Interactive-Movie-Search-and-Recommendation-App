import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext";

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const { login } = useAuth(); // Get the login method from context
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    if (name && password) {
      const userData = { name, password };
      login(userData); // Use the login method from context
      alert("Login successful!");

      if (typeof onLoginSuccess === "function") {
        onLoginSuccess(); 
      }

      // Close the modal and navigate to home after a delay
      setTimeout(() => {
        if (typeof onClose === "function") {
          onClose(); // Close modal
        }
        navigate("/"); // Navigate to home page
      }, 500);
    } else {
      alert("Please fill in both fields");
    }
  };

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose(); 
    }
    navigate("/"); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-white hover:text-gray-400"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;