import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBuilding, FaCalendarAlt, FaMoneyBill, FaCog } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="bg-blue-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
    
      <div className="bg-blue-600 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-bold">Employee MS</h3>
      </div>
     
      <div className="px-4">
        <NavLink
          to="/AdminDashboard"
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-blue-700 ${
              isActive ? 'bg-blue-700' : ''
            }`
          }
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-employees"
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-blue-700 ${
              isActive ? 'bg-blue-700' : ''
            }`
          }
        >
          <FaUsers />
          <span>Employees</span>
        </NavLink>
        <NavLink
          to="/admin-departments"
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-blue-700 ${
              isActive ? 'bg-blue-700' : ''
            }`
          }
        >
          <FaBuilding />
          <span>Departments</span>
        </NavLink>
        <NavLink
          to="/admin-leaves"
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-blue-700 ${
              isActive ? 'bg-blue-700' : ''
            }`
          }
        >
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-blue-700 ${
              isActive ? 'bg-blue-700' : ''
            }`
          }
        >
          <FaMoneyBill />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to="/admin-settings"
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-blue-700 ${
              isActive ? 'bg-blue-700' : ''
            }`
          }
        >
          <FaCog />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
