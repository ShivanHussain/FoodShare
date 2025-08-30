// utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true,
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Backend sent 401 → token expired or invalid
      localStorage.removeItem("token");
      window.location.href = "/login"; // redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
