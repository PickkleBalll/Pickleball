import axios from "axios";

const API_URL = "https://localhost:5001/api/AdminDashboard";

interface User {
  id: string;
  email: string;
  fullname: string; 
  phoneNumber: string;
  role: string;
  isVerified: boolean;
}
export const getSummary = async () => {
  const res = await axios.get(`${API_URL}/summary`);
  return res.data;
};

export const getBookings = async () => {
  const res = await axios.get(`${API_URL}/bookings`);
  return res.data;
};
export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get("https://localhost:5001/api/admin/users");
  return response.data as User[]; // 👈 ép kiểu rõ ràng cho TypeScript
};
