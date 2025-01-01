import React from "react";

const SummaryCard = ({icon, text, number, color }) => {
  return (
    <div
      className={`relative p-3 shadow-lg rounded-lg bg-opacity-80 bg-white border-l-4 ${color} hover:scale-105 transition-transform duration-300`}
    >
      {/* Icon and Image Section */}
      <div className="w-full flex justify-center items-center space-x-4">
        {/* Icon */}
        <div className="text-4xl text-gray-600">{icon}</div>
      </div>

      {/* Card Content */}
      <div className="mt-4 text-center">
        <h3 className="text-xl font-semibold text-gray-800">{text}</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{number}</p>
      </div>

      {/* Decorative border */}
      <div className="absolute inset-0 border-2 border-gray-200 rounded-lg pointer-events-none"></div>
    </div>
  );
};

export default SummaryCard;
