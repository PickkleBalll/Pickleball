import api from './apiService';

// ===== Interface Đăng Ký =====
export interface RegisterData {
  FullName: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  bio: string;
}

export interface RegisterResponse {
  user: {
    userId: number;
    username: string;
    email: string;
  };
  token: string;
}

// ===== Interface Đăng Nhập =====
export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: {
    token: string;
    userId: number;
    fullname: string;
    email: string;
    role: 'Admin' | 'Learner' | 'Coach';
    expiresAt: string;
  };
  token: string; // Lưu ý: API có thể trả về token ở cả root và data, cần kiểm tra
}

// ===== API: Đăng ký người dùng =====
export const register = async (userData: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>('/api/Auth/register', userData);
    return response.data;
  } catch (error: unknown) {
    let message = 'Đăng ký thất bại';
    if (error && typeof error === 'object' && 'response' in error) {
      const err = error as { response?: { data?: { message?: string } } };
      message = err.response?.data?.message || message;
    }
    throw new Error(message);
  }
};

// ===== API: Đăng nhập người dùng =====
export const login = async (credentials: LoginData): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/api/Auth/login', credentials); // Sửa endpoint
    return response.data;
  } catch (error: unknown) {
    let message = 'Đăng nhập thất bại';
    if (error && typeof error === 'object' && 'response' in error) {
      const err = error as { response?: { data?: { message?: string } } };
      message = err.response?.data?.message || message;
    }
    throw new Error(message);
  }
};