import React from "react";

const SummaryCard = ({ title, value, icon, bgColor, iconBgColor }) => {
  return (
    <div className="flex items-center p-4 shadow-md rounded-lg bg-white">
      {/* Icon in a square container */}
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-md ${iconBgColor} text-white mr-4`}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-700">{title}</h3>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
