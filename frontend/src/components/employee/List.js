import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { EmployeeButtons, columns } from "../../utils/EmployeeHelper";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            name: emp.userId.name,
            dep_name: emp.department.dep_name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                width={40}
                className="rounded-full border border-gray-300 shadow-sm"
                src={`http://localhost:5000/${emp.userId.profileImage}`}
                alt="Profile"
              />
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const query = e.target.value.toLowerCase();
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(query)
    );
    setFilteredEmployees(records);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-gray-700">Manage Employee</h3>
        <p className="text-gray-500">View and manage all employee records.</p>
      </div>

      {/* Search and Add Button */}
      <div className="flex justify-between items-center bg-white shadow-sm rounded-lg p-4 mb-4">
        <input
          type="text"
          placeholder="Search by Department Name"
          className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Add New Employee
        </Link>
      </div>

      {/* Employee Data Table */}
      <div className="bg-white shadow-sm rounded-lg p-4">
        <DataTable
          columns={columns}
          data={filteredEmployee}
          progressPending={empLoading}
          pagination
          highlightOnHover
          customStyles={{
            headRow: {
              style: {
                backgroundColor: "#f7f7f7",
                fontWeight: "bold",
              },
            },
            rows: {
              style: {
                '&:hover': {
                  backgroundColor: "#f9f9f9",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default List;
