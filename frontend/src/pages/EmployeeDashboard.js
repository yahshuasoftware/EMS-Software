import React from 'react';
import Sidebar from "../components/EmployeeDashboard/Sidebar"
import EmployeeNavbar from"../components/Dashboard/EmployeeNavbar"
const EmployeeDashboard=()=>{
    return (
        <div>
        <EmployeeNavbar/>
     
          <Sidebar />
        
         </div>
      );
    };


export default EmployeeDashboard