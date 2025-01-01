import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = () => {
    fetchDepartments();
  };

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons
              Id={dep._id}
              onDepartmentDelete={onDepartmentDelete}
            />
          ),
        }));
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };

  return (
    <>
      {depLoading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      ) : (
        <div className="p-6 bg-gray-100 min-h-screen">
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-gray-800">
              Manage Departments
            </h3>
            <p className="text-gray-500">View and manage department records.</p>
          </div>

          {/* Search and Add Button Section */}
          <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-6">
            <input
              type="text"
              placeholder="Search by Department Name"
              className="w-1/2 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
              Add New Department
            </Link>
          </div>

          {/* Departments Data Table */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              highlightOnHover
              pagination
              customStyles={{
                headRow: {
                  style: {
                    backgroundColor: "#f9fafb",
                    fontWeight: "bold",
                  },
                },
                rows: {
                  style: {
                    "&:hover": {
                      backgroundColor: "#f4f5f7",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
