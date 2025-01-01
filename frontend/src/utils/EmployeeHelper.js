import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define columns for the DataTable
export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
    width:"100px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width:"100px"
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width:"100px"
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
    width:"120px"
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width:"130px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center:"true"
  },
];

// Fetch departments
export const fetchDepartments = async () => {
  let departments = [];
  try {
    const response = await axios.get("http://localhost:5000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (err) {
    console.error("Error occurred while fetching departments:", err);
  }
  return departments;
};

// Fetch employees for a specific department
export const getEmployees = async (id) => {
  let employees = [];
  try {
    const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      employees = response.data.employees;
    } else {
      console.error("Failed to fetch employees:", response.data.message);
    }
  } catch (err) {
    console.error("Error occurred while fetching employees:", err.response || err.message || err);
  }
  return employees;
};

// Buttons for employee actions
export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    console.log(`Edit employee with ID: ${Id}`);
  };

  const handleSalary = () => {
    console.log(`View salary for employee with ID: ${Id}`);
  };

  const handleLeave = () => {
    console.log(`Manage leave for employee with ID: ${Id}`);
  };

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employee/${Id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-yellow-600 text-white rounded"
        onClick={()=>navigate(`/admin-dashboard/employee/edit/${Id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-green-600 text-white rounded"
        onClick={() => navigate (`/admin-dashboard/employees/salary/${Id}`)}
      >
        Salary
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded"
        onClick={()=>navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >
        Leave
      </button>
    </div>
  );
};
