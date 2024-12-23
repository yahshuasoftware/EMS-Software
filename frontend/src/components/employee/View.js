import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const { id } = useParams(); // Extracting the 'id' from the URL
  const [employee, setEmployee] = useState(null); // State to hold the employee data
  const [loading, setLoading] = useState(true); // State for loading indication
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setEmployee(response.data.employee);
        } else {
          setError("Failed to fetch employee details.");
        }
      } catch (err) {
        setError(
          err.response?.data?.error || "An error occurred while fetching data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]); // Dependency array includes 'id' to refetch if it changes

 
  

  return (
    <>{employee ?(
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Image */}
        <div>
          <img
            src={`http://localhost:5000/${employee.userId.profileImage}` }
          
            className="rounded-full border w-72 mx-auto"
          />
        </div>

        {/* Details */}
        <div>
          {/* Name */}
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Name:</p>
            <p className="font-medium">{employee.userId.name}</p>
          </div>

          {/* Employee ID */}
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Employee ID:</p>
            <p className="font-medium">{employee.employeeId}</p>
          </div>

          {/* Date of Birth */}
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Date of Birth:</p>
            <p className="font-medium">
              {new Date(employee.dob).toLocaleDateString()}
            </p>
          </div>

          {/* Gender */}
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Gender:</p>
            <p className="font-medium">{employee.gender}</p>
          </div>

          {/* Department */}
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Department:</p>
            <p className="font-medium">{employee.department.dep_name}</p>
          </div>

          {/* Marital Status */}
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Marital Status:</p>
            <p className="font-medium">{employee.maritalStatus}</p>
          </div>
        </div>
      </div>
    </div>
    ):<div> Loading.</div>}</>
  );
};

export default View;