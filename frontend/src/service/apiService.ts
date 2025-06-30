import axios from 'axios';

// Cấu hình Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5294', 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout 10 giây
  withCredentials: false, // Tắt credentials để tránh vấn đề CORS
});

// Interceptor để thêm token vào header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Xử lý lỗi toàn cục
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message);

    // Nếu token hết hạn (status 401), xóa token và chuyển hướng
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default api;