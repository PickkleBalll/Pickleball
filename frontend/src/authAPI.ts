// src/api/authApi.ts
import axios from 'axios';

const API_URL = 'https://08f3-2405-4802-80d7-94e0-8dad-9c9-1df6-c7b6.ngrok-free.app'; // Backend 

export interface RegisterData {
  email: string,
  password: string,
  fullname: string,
  phonenumber: string,
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  message: string;
  user?: any;
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const res = await axios.post<AuthResponse>(`${API_URL}/register`, data);
  return res.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const res = await axios.post<AuthResponse>(`${API_URL}/login`, data);
  return res.data;
};
