import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import List from "./components/employee/List";
import LeaveList from "./components/leave/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import AddSalary from "./components/salary/Add";
import Summary from "./components/EmployeeDashboard/Summary";
import AddLeave from "./components/leave/Add";
import Setting from "./components/EmployeeDashboard/Setting";
import Table from "./components/leave/Table";
import Detail from "./components/leave/Detail";
import ViewSalary from "./components/salary/View";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }>
           
          <Route index element={<AdminSummary />}></Route>
          <Route path="departments" element={<DepartmentList />}></Route>
          <Route path="/admin-dashboard/add-department" element={<AddDepartment/>}></Route>
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment/>}></Route>
          <Route path="/admin-dashboard/employee" element={<List/>}></Route>
          <Route path="add-employee" element={<Add />}></Route> 
          <Route path="employee/:id" element={< View/>}></Route>
          <Route path="/admin-dashboard/employee/edit/:id" element={< Edit/>}></Route>
          <Route path="/admin-dashboard/leaves" element={<Table/>}></Route>
          <Route path="/admin-dashboard/leaves/:id" element={<Detail/>}></Route>
          <Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList/>}></Route>
          <Route path="/admin-dashboard/salary/add" element={< AddSalary/>}></Route>
          <Route path="/admin-dashboard/Setting" element={<Setting />}></Route>
          <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary/>}></Route>
         
       </Route>  
        <Route
          path="/employee-dashboard"
          element={
          <PrivateRoutes>
          <RoleBasedRoutes requiredRole={["admin","employee"]}>
          <EmployeeDashboard />
          </RoleBasedRoutes>
          </PrivateRoutes>
          }
          > 
          <Route index element={<Summary/>}></Route>
          <Route path="profile/:id" element={<View />}></Route>
          <Route path="leaves/:id" element={<LeaveList />}></Route>
          <Route path="add-leave" element={<AddLeave />}></Route>
          <Route path="salary/:id" element={<ViewSalary/>}></Route>
          <Route path="setting" element={<Setting />}></Route>


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
