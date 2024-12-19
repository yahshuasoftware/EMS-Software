import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { EmployeeButtons, columns } from "../../utils/EmployeeHelper";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);

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
            dob: new Date(emp.dob).toDateString(),
            profileImage: emp.userId.profileImage || "default-profile.png",
            action: <EmployeeButtons Id={emp._id} />,
          }));
          setEmployees(data);
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

  return (
    <div className="p-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>

      {/* Search and Add Button */}
      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search By Department Name"
          className="px-4 py-0.5 border rounded"
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-blue-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>

      {/* Employee Data Table */}
      <div className="mt-4">
        <DataTable
          columns={columns}
          data={employees}
          progressPending={empLoading}
          pagination
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default List;
