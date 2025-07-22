import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // axios.get("https://project-dharti-pickups.onrender.com/api/user/profile", {
    //     withCredentials: true,
    //   })
    axios.get("/api/user/profile")
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
