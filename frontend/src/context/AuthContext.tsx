import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  fullname: string;
  email: string;
  phonenumber?: string; // Tùy chọn vì API có thể không trả về
  role: 'admin' | 'learner' | 'coach';
  avatar?: string;
}

interface AuthContextType {
  user: Omit<User, 'password'> | null;
  token: string | null;
  login: (userData: Omit<User, 'password'>, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedCurrentUser = localStorage.getItem('currentUser');
      const storedToken = localStorage.getItem('token');
      const storedAuth = localStorage.getItem('isAuthenticated');

      if (storedCurrentUser && storedToken && storedAuth === 'true') {
        const parsedUser = JSON.parse(storedCurrentUser);
        if (parsedUser && parsedUser.role) {
          setUser(parsedUser);
          setToken(storedToken);
        }
      }

      // Xóa key cũ nếu tồn tại
      if (localStorage.getItem('auth')) {
        localStorage.removeItem('auth');
      }
    } catch (error) {
      console.error('Lỗi khi tải thông tin người dùng từ localStorage:', error);
      // Xóa dữ liệu không hợp lệ
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: Omit<User, 'password'>, authToken: string) => {
    if (!userData || !authToken) {
      throw new Error('Dữ liệu người dùng hoặc token không hợp lệ');
    }
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
    localStorage.setItem('isAuthenticated', 'true');

    // Điều hướng dựa trên vai trò
    if (userData.role === 'admin') {
      navigate('/admin/dashboard-admin');
    } else if (userData.role === 'coach') {
      navigate('/coach');
    } else {
      navigate('/dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    navigate('/signin');
  };

  if (isLoading) return <div>Đang tải...</div>;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth phải được sử dụng trong AuthProvider');
  return context;
};