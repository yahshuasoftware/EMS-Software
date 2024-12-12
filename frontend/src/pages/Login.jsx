import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const LoginPage = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ company: "", email: "", password: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); 

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let valid = true;
    setSuccessMessage("");
    setError({ company: "", email: "", password: "" });

   
    if (!selectedCompany) {
      setError((prevError) => ({ ...prevError, company: "Please select a company" }));
      valid = false;
    }

 
    if (!email) {
      setError((prevError) => ({ ...prevError, email: "Email is required" }));
      valid = false;
    } else if (!validateEmail(email)) {
      setError((prevError) => ({
        ...prevError,
        email: "Enter a valid email address",
      }));
      valid = false;
    } else {
      setError((prevError) => ({ ...prevError, email: "" }));
    }

 
    if (!password) {
      setError((prevError) => ({
        ...prevError,
        password: "Password is required",
      }));
      valid = false;
    } else if (password.length < 6) {
      setError((prevError) => ({
        ...prevError,
        password: "Password must be at least 6 characters",
      }));
      valid = false;
    } else {
      setError((prevError) => ({ ...prevError, password: "" }));
    }

    if (valid) {
      //  credentials
      if (
        email === "admin@example.com" &&
        password === "123456" &&
        selectedCompany
      ) {
        setSuccessMessage(`Login Successful for ${selectedCompany}!`);
        setError({ company: "", email: "", password: "" });
        
        //admin
        navigate("/AdminDashboard");
      } else {
        setError((prevError) => ({
          ...prevError,
          password: "Invalid email or password",
        }));
      }
    }
  };
  /* // Validate password
    if (!password) {
      setError((prevError) => ({ ...prevError, password: "Password is required" }));
      valid = false;
    } else if (password !== "admin") {
      setError((prevError) => ({
        ...prevError,
        password: "Password must be 'admin'.",
      }));
      valid = false;
    }

    if (valid) {
      try {
        // Replace the API endpoint with your backend URL
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          company: selectedCompany,
          email,
          password,
        });

        if (response.data.success) {
          setSuccessMessage(`Login Successful for ${selectedCompany}!`);
          setError({ company: "", email: "", password: "" });

          
          navigate("/AdminDashboard");
        } else {
          setError((prevError) => ({
            ...prevError,
            password: response.data.message || "Invalid credentials",
          }));
        }
      } catch (err) {
        console.error("Error during login:", err);
        setError((prevError) => ({
          ...prevError,
          password: "Server error. Please try again later.",
        }));
      }
    }
  }; */

  return (
    <div className="min-h-screen flex flex-col">
      <div className="text-center text-4xl font-bold mb-6 text-blue-700 mt-[60px]">
        Employee Management System
      </div>

      <div className="flex flex-1">
        <div
          className="w-1/2 bg-cover bg-left bg-no-repeat pl-30 ml-[200px] mt-[70px]"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-vector/business-team-having-meeting-brainstorming-working-together-looking-charts-graphs-using-laptop-tablet_123891-121697.jpg?w=740')",
            backgroundSize: "contain",
            height: "450px",
          }}
        ></div>

        <div className="w-1/2 bg-white p-6 flex items-center justify-center mr-[180px]">
          <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Login</h2>
            <form onSubmit={handleLogin} noValidate>
             
              <div className="mb-4">
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Select Company
                </label>
                <select
                  id="company"
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error.company ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Choose a company</option>
                  <option value="Yashuva">Yashuva</option>
                  <option value="Yashuva2">Yashuva2</option>
                  <option value="Yashuva3">Yashuva3</option>
                </select>
                {error.company && (
                  <p className="text-sm text-red-500 mt-1">{error.company}</p>
                )}
              </div>

            
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                    error.email ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter your email"
                />
                {error.email && (
                  <p className="text-sm text-red-500 mt-1">{error.email}</p>
                )}
              </div>

            
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                    error.password ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter your password"
                />
                {error.password && (
                  <p className="text-sm text-red-500 mt-1">{error.password}</p>
                )}
              </div>

              {successMessage && (
                <p className="text-sm text-blue-500 mb-4">{successMessage}</p>
              )}

             
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="mr-2 rounded border-gray-300 focus:ring-blue-500"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline focus:outline-none"
                >
                  Forgot password?
                </a>
              </div>

          
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
