import axios from 'axios';
import { LoginResponse } from '../types/auth';

const API_URL = 'https://localhost:5001/api/auth';

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (data: {
  fullname: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  gender?: string;
  dateOfBirth?: string;
  specialty?: string;
}) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};
