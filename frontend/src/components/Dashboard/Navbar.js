import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    alert("You have been logged out.");
    navigate("/login");
  };

  return (
    <nav className="bg-pink-400 h-16 flex items-center justify-between px-6 shadow-md">
      {/* Right Section: Admin and Logout */}
      <div className="flex items-center space-x-6 ml-auto">
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
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
