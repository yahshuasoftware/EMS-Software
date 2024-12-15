import React from "react";
// import { NavLink } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-pink-400 h-16 flex items-center justify-between px-6 shadow-md">
      {/* Center Section: Search Bar */}
      <div className="relative hidden md:block">
        <input
          type="text"
          placeholder="Search..."
          className="rounded-full py-2 px-4 w-64 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-black-900 shadow-sm"
        />
        <FaSearch className="absolute top-2.5 right-4 text-gray-500" />
      </div>

      {/* Right Section: Icons and Logout Button */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <button className="text-black hover:text-gray-200">
          <FaBell className="text-2xl" />
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-3xl text-black" />
          <span className="text-black text-sm font-medium hidden md:block">
            Admin
          </span>
        </div>

        {/* Logout Button */}
        <button
          className="bg-black text-white text-sm py-2 px-4 rounded-full hover:bg-gray-800 transition"
          onClick={() => {
            alert("You have been logged out.");
            // Add logout functionality here
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
