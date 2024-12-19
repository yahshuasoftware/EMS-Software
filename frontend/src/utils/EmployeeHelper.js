import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define columns for the DataTable
export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Image",
    selector: (row) => (
      <img
        src={row.profileImage}
        alt="Profile"
        className="w-10 h-10 rounded-full"
      />
    ),
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
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
        onClick={handleEdit}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-green-600 text-white rounded"
        onClick={handleSalary}
      >
        Salary
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded"
        onClick={handleLeave}
      >
        Leave
      </button>
    </div>
  );
};
