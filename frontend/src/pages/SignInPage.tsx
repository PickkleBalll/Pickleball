import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Tìm người dùng khớp với email và password
    const matchedUser = users.find(
      (user: { email: string; password: string }) => user.email === email && user.password === password
    );

    if (matchedUser) {
      login(matchedUser); // Gọi login từ AuthContext, tự động lưu currentUser và điều hướng
    } else {
      setError('Email hoặc mật khẩu không đúng 😢');
    }
  };

  const handleGoToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="auth-page flex">
      <div className="w-[40%] p-4 bg-white-200 flex align-items-center">
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6 text-center">Chào mừng bạn quay lại ✨</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 auth-input"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 auth-input"
            />
            <div className="text-sm text-black-500">
              <a href="#" className="hover:underline">Quên mật khẩu?</a>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full text-black font-semibold transition bg-gradient-to-r from-green-300 to-blue-400 hover:opacity-90 auth-button"
            >
              ĐĂNG NHẬP
            </button>
          </form>

          <button
            onClick={handleGoToSignUp}
            className="mt-6 text-sm text-center text-black-300 hover:underline"
          >
            Chưa có tài khoản? Đăng ký ngay →
          </button>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
      </div>

      <div className="w-[60%] h-screen bg-cover bg-center rounded-l-[250px] auth-background"></div>
    </div>
  );
};

export default SignInPage;