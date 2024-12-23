import React from 'react';
import Sidebar from "../components/EmployeeDashboard/Sidebar"
import EmployeeNavbar from"../components/Dashboard/EmployeeNavbar"
// import Navbar from '../components/Dashboard/Navbar';
import {Outlet} from 'react-router-dom';
const EmployeeDashboard=()=>{
    return (
        <div className='flex'>
     <Sidebar />
     <div className='flex-1 mi-64 bg-grey-100 h-screen'>
     <EmployeeNavbar/>
     <Outlet/>
    
     </div>
         
         </div>
      );
    };


export default EmployeeDashboard