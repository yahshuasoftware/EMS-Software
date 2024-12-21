import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import AdminSummary from "./components/Dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import Add from "./components/employee/Add";
import List from "./components/employee/List";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import Summary from "./components/EmployeeDashboard/Summary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root path to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Route for Login */}
        <Route path="/login" element={<Login />} />

        {/* Private Routes for Admin */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          {/* Nested Routes under Admin Dashboard */}
          <Route index element={<AdminSummary />} />
          <Route path="departments" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="employee" element={<List />} />
          <Route path="add-employee" element={<Add />} />
          <Route path="employee/:id" element={< View/>} />
          <Route path="employee/edit/:id" element={<Edit/>} />
        </Route>

      
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin","employee"]}>
                <EmployeeDashboard/>
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        />
    <Route index element={<Summary/>}></Route>

    <Route path="/employee-dashboard/profile/:id" element = {<View />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
