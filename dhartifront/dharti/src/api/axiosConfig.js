import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

// axiosInstance.interceptors.request.use(config => {
//   if (config.baseURL?.endsWith('/api') && config.url?.startsWith('/api')) {
//     config.url = config.url.replace(/^\/api/, '');
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

export default axiosInstance;
