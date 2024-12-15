import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBill,
  FaCog,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="bg-white text-gray-800 h-screen fixed left-0 top-0 bottom-0 w-64 shadow-lg">
      {/* Sidebar Header */}
      <div className="bg-black h-16 flex items-center justify-center shadow-md">
        <h3 className="text-2xl font-bold text-white">Employees MS</h3>
      </div>

      {/* Navigation Links */}
      <div className="mt-4 px-2 space-y-2">
        <NavLink
          to="/AdminDashboard"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 text-gray-800"
            }`
          }
        >
          <FaTachometerAlt className="text-lg" />
          <span className="font-semibold">Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-employees"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 text-gray-800"
            }`
          }
        >
          <FaUsers className="text-lg" />
          <span className="font-semibold">Employees</span>
        </NavLink>
        <NavLink
          to="/admin-departments"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 text-gray-800"
            }`
          }
        >
          <FaBuilding className="text-lg" />
          <span className="font-semibold">Departments</span>
        </NavLink>
        <NavLink
          to="/admin-leaves"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 text-gray-800"
            }`
          }
        >
          <FaCalendarAlt className="text-lg" />
          <span className="font-semibold">Leaves</span>
        </NavLink>
        <NavLink
          to="/admin-salary"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 text-gray-800"
            }`
          }
        >
          <FaMoneyBill className="text-lg" />
          <span className="font-semibold">Salary</span>
        </NavLink>
        <NavLink
          to="/admin-settings"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 text-gray-800"
            }`
          }
        >
          <FaCog className="text-lg" />
          <span className="font-semibold">Settings</span>
        </NavLink>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full py-4 bg-gray-100 text-center shadow-md">
        <p className="text-xs text-gray-500">&copy; 2024 EM Management</p>
      </div>
    </div>
  );
};

export default AdminSidebar;
