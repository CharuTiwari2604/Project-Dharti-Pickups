// src/api/axiosConfig.js
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api",  // ✅ Change to your backend URL
   baseURL: API_URL,
  withCredentials: true,                // ✅ Important for cookie-based auth
  headers: {
    "Content-Type": "application/json"
  }
});

export default axiosInstance;
