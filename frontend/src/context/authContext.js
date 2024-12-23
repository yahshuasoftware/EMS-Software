import React, { createContext, useState, useContext, useEffect } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading]=useState(false);

//   const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:5000/api/auth/verify",
            {
              headers: { 
                Authorization: `Bearer ${token} `,
              },
            }
          );   
          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          setUser(null)
          setLoading(false)
        }
      } catch (error) {
        if (error.response && !error.response.data.error) {
          setUser(null);
        }
      }
      finally{
        setLoading(false)
      }
    };
    verifyUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
export default AuthProvider;
