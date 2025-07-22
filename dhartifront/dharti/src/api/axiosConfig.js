// src/api/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://project-dharti-pickups.onrender.com/api",  // ✅ Change to your backend URL
  withCredentials: true,                // ✅ Important for cookie-based auth
  headers: {
    "Content-Type": "application/json"
  }
});

export default axiosInstance;
