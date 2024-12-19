import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/group-people-working-out-business-plan-office_1303-15861.jpg?t=st=1734118507~exp=1734122107~hmac=2d16a1927da7b71980e790bd61c04050a7c5db88564ce58f8658fc8c3e860e12&w=996')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Login Container */}
      <div className="relative bg-white bg-opacity-10 backdrop-blur-sm shadow-2xl rounded-2xl p-8 max-w-md w-full z-10">
        {/* Logo Section */}
        <div className="text-center mb-0">
          <img
            src="https://res.cloudinary.com/deynias1s/image/upload/v1733916092/b0omkbghkhb3ttdeccgd.png"
            alt="Yahshua Software Limited Logo"
            className="w-32 mx-auto mb-4 animate-bounce"
          />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-2xl font-extrabold text-white text-center hover:text-pink-600">
            Login
          </h2>
          {error && (
            <p className="bg-red-100 text-red-700 p-3 rounded-lg text-center animate-pulse">
              {error}
            </p>
          )}

          {/* Email Section */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-white font-medium hover:text-pink-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-3xl shadow-sm focus:ring focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition duration-300"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Section */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-white font-medium hover:text-pink-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-3xl shadow-sm focus:ring focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition duration-300"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-pink-700 text-white font-semibold py-3 rounded-3xl shadow-lg hover:from-blue-600 hover:to-pink-800 transform hover:scale-105 transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
