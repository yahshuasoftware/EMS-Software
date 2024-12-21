import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const EmployeeNavbar = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the token
    alert("You have been logged out.");
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-900 h-16 flex items-center justify-between px-6 shadow-lg">
      {/* Left Section: Welcome Message */}
      <div
  className="text-white text-lg font-semibold"
  style={{ marginLeft: "15rem" }} // Custom margin (15rem = 240px)
>
  Welcome to Employee Dashboard
</div>


      {/* Right Section: Profile and Logout */}
      <div className="flex items-center space-x-6">
        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-3xl text-white" />
          <span className="text-white text-sm font-medium hidden md:block">
            Employee
          </span>
        </div>

        {/* Logout Button */}
        <button
          className="bg-white text-blue-800 text-sm py-2 px-4 rounded-full hover:bg-gray-100 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default EmployeeNavbar;
