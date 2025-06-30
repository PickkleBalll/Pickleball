import api from './apiService';

export interface ListCoach {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  phone: number;
  emailContact: string;
  bio: string;
}

// ===== Lấy tất cả currentuser =====
export const getCurrentUser = async (): Promise<ListCoach[]> => {
  try {
    const response = await api.get<ListCoach[]>('/api/User/me');
    return response.data;
  } catch (error: unknown) {
    let message = 'Lấy danh sách user thất bại';
    if (error && typeof error === 'object' && 'response' in error) {
      const err = error as { response?: { data?: { message?: string } } };
      message = err.response?.data?.message || message;
    }
    throw new Error(message);
  }
};
// ===== Lấy tất cả users =====
export const getAll = async (): Promise<ListCoach[]> => {
  try {
    const response = await api.get<ListCoach[]>('/api/User');
    return response.data;
  } catch (error: unknown) {
    let message = 'Lấy danh sách user thất bại';
    if (error && typeof error === 'object' && 'response' in error) {
      const err = error as { response?: { data?: { message?: string } } };
      message = err.response?.data?.message || message;
    }
    throw new Error(message);
  }
};
// ===== Lấy tất cả huấn luyện viên =====
export const getAllCoaches = async (): Promise<ListCoach[]> => {
  try {
    const response = await api.get<ListCoach[]>('/api/User/coaches');
    return response.data;
  } catch (error: unknown) {
    let message = 'Lấy danh sách huấn luyện viên thất bại';
    if (error && typeof error === 'object' && 'response' in error) {
      const err = error as { response?: { data?: { message?: string } } };
      message = err.response?.data?.message || message;
    }
    throw new Error(message);
  }
};
// ===== Lấy tất cả học viên =====
export const getAllLearner = async (): Promise<ListCoach[]> => {
  try {
    const response = await api.get<ListCoach[]>('/api/User/learners');
    return response.data;
  } catch (error: unknown) {
    let message = 'Lấy danh sách huấn luyện viên thất bại';
    if (error && typeof error === 'object' && 'response' in error) {
      const err = error as { response?: { data?: { message?: string } } };
      message = err.response?.data?.message || message;
    }
    throw new Error(message);
  }
};
// ===== Cập nhật thông tin user=====
export const UpdateProfileUser = async (): Promise<ListCoach[]> => {
  try {
    const response = await api.get<ListCoach[]>('/api/User/learners');
    return response.data;
  } catch (error: unknown) {
    let message = 'Lấy danh sách huấn luyện viên thất bại';
    if (error && typeof error === 'object' && 'response' in error) {
      const err = error as { response?: { data?: { message?: string } } };
      message = err.response?.data?.message || message;
    }
    throw new Error(message);
  }
};
