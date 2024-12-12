import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";


import Login from "./pages/Login"
import AdminDashboard from './Pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/admindashboard" element ={<AdminDashboard/>}></Route>

   <Route path="/" element={<Login/>}></Route>
  
 
   </Routes>
   </BrowserRouter>
  );
}

export default App;
