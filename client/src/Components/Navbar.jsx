import React, { useState } from "react";
import img1 from "../Assets/dashboard.png";
import logo from "../Assets/logo.png"
import { Link } from "react-router-dom";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} className="h-8 mr-2" alt="Flowbite Logo" />
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            Re-Eco
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-white font-semibold hover:text-gray-300 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/facility/login"
            className="text-white font-semibold hover:text-gray-300 transition-colors duration-200"
          >
            Facility
          </Link>
          <Link
            to="/user/login"
            className="text-white font-semibold hover:text-gray-300 transition-colors duration-200"
          >
            User
          </Link>
          <Link
            to="/about"
            className="text-white font-semibold hover:text-gray-300 transition-colors duration-200"
          >
            About
          </Link>
        </div>
        <button
          type="button"
          className="md:hidden p-1 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
          onClick={handleDropdown}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isDropdownOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>
      {isDropdownOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 py-3 space-y-2 flex flex-col">
            <Link
              to="/"
              className="text-white font-semibold hover:text-gray-300 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/facility/login"
              className="text-white font-semibold hover:text-gray-300 transition-colors duration-200"
            >
              Facility
            </Link>
            <Link
              to="/user/login"
              className="text-white font-semibold hover:text-gray-300 transition-colors duration-200"
            >
              User
            </Link>
            <Link
              to="/about"
              className="text-white font-semibold hover:text-gray-300 transition-colors duration-200"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
