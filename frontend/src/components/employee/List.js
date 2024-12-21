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
                className="rounded-full"
                src={`http://localhost:5000/${emp.userId.profileImage}`}
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
    <div className="p-6 bg-gray-50 min-h-screen">
    <div className="text-center mb-6">
        <h3 className="text-3xl font-extrabold text-gray-800">Manage Employees</h3>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search By Employee Name"
          className="px-4 py-2 border rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md transition duration-200"
        >
          Add New Employee
        </Link>
      </div>
       <div className="bg-white p-4 rounded-lg shadow-lg mt-6">
        <DataTable
          columns={columns}
          data={filteredEmployee}
          progressPending={empLoading}
          pagination
          highlightOnHover
          customStyles={{
            headRow: {
              style: {
                backgroundColor: "#f9fafb", 
                fontWeight: "bold",
              },
            },
            rows: {
              style: {
                backgroundColor: "#ffffff", 
                "&:nth-child(even)": {
                  backgroundColor: "#f3f4f6", 
                },
              },
            },
            pagination: {
              style: {
                backgroundColor: "#f9fafb",
                padding: "10px",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default List;
