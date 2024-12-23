import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext"; // Correct path

const SummaryCard = () => {
  const { user } = useAuth(); // Access user context
  
  return (
    <div className="flex items-center p-4 shadow-md rounded-lg bg-white">
      <div
        className="w-14 h-14 flex items-center justify-center rounded-md bg-teal-600 text-white mr-4"
      >
        <FaUser />
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-700">Welcome back</h3>
        <p className="text-2xl font-semibold text-gray-900">
          {user.name}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
