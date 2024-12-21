import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";

const Add = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const departments = await fetchDepartments();
        setDepartments(departments || []);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
        setDepartments([]); // Set to empty array on error
      }
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    try {
      const emps = await getEmployees(e.target.value);
      setEmployees(emps || []);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      setEmployees([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employee");
      } else {
        alert("Failed to update employee.");
      }
    } catch (error) {
      console.error("An error occurred while updating employee:", error);
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Add Salary</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Department Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  onChange={handleDepartment}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Department</option>
                  {Array.isArray(departments) &&
                    departments.map((dep) => (
                      <option key={dep._id} value={dep._id}>
                        {dep.dep_name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Employee Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee
                </label>
                <select
                  name="employeeId"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Employee</option>
                  {Array.isArray(employees) &&
                    employees.map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.employeeId}
                      </option>
                    ))}
                </select>
              </div>

              {/* Basic Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Basic Salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  onChange={handleChange}
                  placeholder="Basic Salary"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>

              {/* Allowances */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allowances
                </label>
                <input
                  type="number"
                  name="allowances"
                  onChange={handleChange}
                  placeholder="Allowances"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>

              {/* Deductions */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                  onChange={handleChange}
                  placeholder="Deductions"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>

              {/* Pay Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pay Date
                </label>
                <input
                  type="date"
                  name="payDate"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Add;
