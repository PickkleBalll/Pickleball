import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  fullname: string;
  email: string;
  password: string;
  role: 'admin' | 'learner'; // 👈 Phân vai người dùng
}

interface AuthContextType {
  user: Omit<User, 'password'> | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAuth = localStorage.getItem('isAuthenticated');

    if (storedUser && storedAuth === 'true') {
      const parsedUser: User = JSON.parse(storedUser);
      setUser({
        fullname: parsedUser.fullname,
        email: parsedUser.email,
        role: parsedUser.role,
      });
    }

    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser({
      fullname: userData.fullname,
      email: userData.email,
      role: userData.role,
    });

    localStorage.setItem('user', JSON.stringify(userData)); // lưu cả role và password
    localStorage.setItem('isAuthenticated', 'true');

    // Điều hướng dựa trên role
    if (userData.role === 'admin') {
      navigate('/admin/user-management');
    } else {
      navigate('/dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/signin');
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth phải được dùng trong AuthProvider');
  return context;
};
