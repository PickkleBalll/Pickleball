import axios from "axios";
import { config } from "process";

const api = axios.create({
  baseURL: 'https://localhost:5001/api/Auth', // cung domain vs authAPI
  headers: {
    "Content-Type": "application/json",
  },
});

// tu dong them authorization header neu co token 
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}
);
export default api;
