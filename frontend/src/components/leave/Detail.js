import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setLeave(response.data.leave);
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

    fetchLeave();
  }, [id]);

 const changeStatus=async(id,status)=>{
    try {
        const response = await axios.put(
          `http://localhost:5000/api/leave/${id}`,
          {status},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          navigate('/admin-dashboard/leaves');
        } 
      } catch (err) {
        if(error.response && !error.response.data.success){
            alert(error.response.data.error)
        }
      }
 }





  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`}
                className="rounded-full border w-72 mx-auto"
              />
            </div>

            <div>
              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium">{leave.employeeId.userId.name}</p>
              </div>

              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Employee ID:</p>
                <p className="font-medium">{leave.employeeId.employeeId}</p>
              </div>

              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">LeaveType</p>
                <p className="font-medium">{leave.leaveType}</p>
              </div>

              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Reason</p>
                <p className="font-medium">{leave.reason}</p>
              </div>

              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium">
                  {leave.employeeId.department.dep_name}
                </p>
              </div>

              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Start Date:</p>
                <p className="font-medium">
                  {new Date(leave.startDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">End Date:</p>
                <p className="font-medium">
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">
                  {leave.status === "Pending" ? "Action" : "Status"}
                </p>
                {leave.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <button className="px-2 py-0.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    onClick={()=>changeStatus(leave._id, "Approved")}
                    >Approve</button>
                    <button className="px-2 py-0.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    onClick={()=>changeStatus(leave._id, "Rejected")}
                    >Reject</button>
                  </div>
                ) : 
                  <p className="font-medium">{leave.status}</p>
            }
                
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div> Loading.</div>
      )}
    </>
  );
};

export default Detail;