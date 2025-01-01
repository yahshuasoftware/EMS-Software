import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const { id } = useParams();
  let sno = 1;

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
        <div className="flex items-center justify-center min-h-screen">
          <span className="text-lg font-medium text-gray-600">Loading...</span>
        </div>
      ) : (
        <div className="p-6 max-w-6xl mx-auto">
          <h3 className="text-center text-3xl font-extrabold text-gray-800 mb-8">
            Salary History
          </h3>

          {/* Search Input */}
          <div className="flex justify-right   mb-6">
            <input
              type="text"
              placeholder="Search By Emp ID"
              onChange={filterSalaries}
              className="px-4 py-2 w-64 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search salaries by employee ID"
            />
          </div>

          {/* Salary Table */}
          {filteredSalaries.length > 0 ? (
            <div className="overflow-x-auto border rounded-lg shadow-lg">
              <table className="w-full table-auto text-sm text-left text-gray-600">
                <thead className="bg-gray-200 text-gray-700 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3">SNO</th>
                    <th className="px-4 py-3">Emp ID</th>
                    <th className="px-4 py-3">Salary</th>
                    <th className="px-4 py-3">Allowance</th>
                    <th className="px-4 py-3">Deduction</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Pay Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSalaries.map((salary) => (
                    <tr
                      key={salary.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">{sno++}</td>
                      <td className="px-4 py-3">{salary.employeeId.employeeId}</td>
                      <td className="px-4 py-3">{salary.basicSalary}</td>
                      <td className="px-4 py-3">{salary.allowances}</td>
                      <td className="px-4 py-3">{salary.deductions}</td>
                      <td className="px-4 py-3">{salary.netSalary}</td>
                      <td className="px-4 py-3">
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
            <div className="text-center text-gray-500 mt-6">
              No salaries found.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default View;
