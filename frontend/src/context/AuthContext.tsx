import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  fullname: string;
  email: string;
  phonenumber: string;
  password: string;
  role: 'admin' | 'learner' | 'coach'; // Thêm 'coach'
  avatar?: string;
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
    const storedCurrentUser = localStorage.getItem('currentUser');
    const storedAuth = localStorage.getItem('isAuthenticated');

    if (storedCurrentUser && storedAuth === 'true') {
      const parsedUser: Omit<User, 'password'> = JSON.parse(storedCurrentUser);
      setUser(parsedUser);
    }

    if (localStorage.getItem('auth')) {
      localStorage.removeItem('auth');
    }

    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    const userWithoutPassword = {
      fullname: userData.fullname,
      email: userData.email,
      phonenumber: userData.phonenumber,
      role: userData.role,
      avatar: userData.avatar,
    };

    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    localStorage.setItem('isAuthenticated', 'true');

    if (userData.role === 'admin') {
      navigate('/admin/user-management');
    } else if (userData.role === 'coach') {
      navigate('/coach');
    } else {
      navigate('/dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
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