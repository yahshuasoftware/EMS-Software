import React, { useState, useEffect } from "react";
import SummaryCard from "./SummaryCard";
import axios from "axios";

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
  const [summary,setSummary]=useState(null)

  useEffect(()=>{
    const fetchSummary=async()=>{
      try{
       const summary=await axios.get(`http://localhost:5000/api/dashboard/summary`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
       })
       setSummary(summary.data)
      }
      catch(error){
        if(error.response){
          alert(error.response.data.error)
        }
        console.log(error.message)
      }
    }
    fetchSummary()
  },[])

  if(!summary){
    return <div>Loading...</div>
  }

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-bold text-center">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<FaDollarSign />}
          text="Monthly Salary"
          number={summary.totalSalary}
          color="bg-red-600"
        />
      </div>
  
      <div className="mt-6">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={summary.leaveSummary.appliedFor}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
            color="bg-green-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Pending"
            number={summary.leaveSummary.pending}
            color="bg-yellow-600"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={summary.leaveSummary.rejected}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
    
}

export default AdminSummary