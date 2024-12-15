import React from "react";
import SummaryCard from "./SummaryCard";
import {
  FaUsers,
  FaBuilding,
  FaDollarSign,
  FaFileAlt,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const AdminSummary = () => {
  const overviewData = [
    {
      title: "Total Employees",
      value: 5,
      icon: <FaUsers className="text-3xl" />,
      bgColor: "bg-white",
      iconBgColor: "bg-teal-500",
    },
    {
      title: "Total Departments",
      value: 3,
      icon: <FaBuilding className="text-3xl" />,
      bgColor: "bg-white",
      iconBgColor: "bg-yellow-500",
    },
    {
      title: "Monthly Pay",
      value: "$2500",
      icon: <FaDollarSign className="text-3xl" />,
      bgColor: "bg-white",
      iconBgColor: "bg-red-500",
    },
  ];

  const leaveDetailsData = [
    {
      title: "Leave Applied",
      value: 2,
      icon: <FaFileAlt className="text-3xl" />,
      bgColor: "bg-white",
      iconBgColor: "bg-blue-500",
    },
    {
      title: "Leave Pending",
      value: 1,
      icon: <FaHourglassHalf className="text-3xl" />,
      bgColor: "bg-white",
      iconBgColor: "bg-yellow-500",
    },
    {
      title: "Leave Approved",
      value: 2,
      icon: <FaCheckCircle className="text-3xl" />,
      bgColor: "bg-white",
      iconBgColor: "bg-green-500",
    },
    {
      title: "Leave Rejected",
      value: 2,
      icon: <FaTimesCircle className="text-3xl" />,
      bgColor: "bg-white",
      iconBgColor: "bg-red-500",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Dashboard Overview Section */}
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {overviewData.map((item, index) => (
          <SummaryCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
            bgColor={item.bgColor}
            iconBgColor={item.iconBgColor}
          />
        ))}
      </div>

      {/* Leave Details Section */}
      <h2 className="text-2xl font-bold my-6">Leave Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {leaveDetailsData.map((item, index) => (
          <SummaryCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
            bgColor={item.bgColor}
            iconBgColor={item.iconBgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminSummary;
