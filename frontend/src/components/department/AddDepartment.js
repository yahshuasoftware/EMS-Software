import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddDepartment = () => {
  const [Department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...Department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/department/add",
        Department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-pink-600 mb-4 text-center">
          Add Department
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Department Name */}
          <div className="space-y-1">
            <label
              htmlFor="dep_name"
              className="block text-sm font-medium text-gray-700"
            >
              Department Name
            </label>
            <input
              type="text"
              id="dep_name"
              onChange={handleChange}
              name="dep_name"
              placeholder="Enter Department Name"
              className="w-full px-4 py-2 border rounded-lg shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
              placeholder="Enter description"
              rows="4"
              className="w-full px-4 py-2 border rounded-lg shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-pink-600  text-white font-semibold rounded-lg shadow-lg hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
