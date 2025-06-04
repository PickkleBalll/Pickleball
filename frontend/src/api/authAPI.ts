import axios from 'axios';

const API_URL = 'https://localhost:5001/api/Auth';

export interface RegisterData {
  email: string,
  password: string,
  fullname: string,
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  message: string;
  // user?: any;
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const res = await axios.post<AuthResponse>(`${API_URL}/register`, data);
  return res.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const res = await axios.post<AuthResponse>(`${API_URL}/login`, data);
  return res.data;
};
