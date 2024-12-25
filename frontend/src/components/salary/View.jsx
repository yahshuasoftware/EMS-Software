import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const { id } = useParams();
  let sno = 1;

  // Fetch salaries from the server
  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      console.error(error.message);
      alert(error.response?.data?.error || "Failed to fetch salaries.");
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  // Filter salaries based on the search query
  const filterSalaries = (event) => {
    const query = event.target.value.toLowerCase();
    const filteredRecords = salaries.filter((salary) =>
      salary.employeeId.employeeId.toLowerCase().includes(query)
    );
    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div className="text-center text-lg text-gray-600">Loading...</div>
      ) : (
        <div className="p-6 max-w-4xl mx-auto">
          <h3 className="text-center text-2xl font-bold text-gray-700 mb-6">
            Salary History
          </h3>

          {/* Search Input */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex justify-start w-full">
              <input
                type="text"
                placeholder="Search By Emp ID"
                onChange={filterSalaries}
                className="px-2 py-1 text-sm w-36 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Search salaries by employee ID"
              />
            </div>
          </div>

          {/* Salary Table */}
          {filteredSalaries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600 border">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-2">SNO</th>
                    <th className="px-4 py-2">Emp ID</th>
                    <th className="px-4 py-2">Salary</th>
                    <th className="px-4 py-2">Allowance</th>
                    <th className="px-4 py-2">Deduction</th>
                    <th className="px-4 py-2">Total</th>
                    <th className="px-4 py-2">Pay Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSalaries.map((salary) => (
                    <tr
                      key={salary.id}
                      className="bg-white border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-2">{sno++}</td>
                      <td className="px-4 py-2">{salary.employeeId.employeeId}</td>
                      <td className="px-4 py-2">{salary.basicSalary}</td>
                      <td className="px-4 py-2">{salary.allowances}</td>
                      <td className="px-4 py-2">{salary.deductions}</td>
                      <td className="px-4 py-2">{salary.netSalary}</td>
                      <td className="px-4 py-2">
                        {salary.payDate
                          ? new Date(salary.payDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500">No salaries found.</div>
          )}
        </div>
      )}
    </>
  );
};

export default View;
