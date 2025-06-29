import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  try {
    const data = await loginUser(email, password);
    const role = data.user.role.toLowerCase() as 'admin' | 'learner' | 'coach';

    // Lưu user vào context
    login({
      ...data.user,
      role,
    });

    // ✅ Lưu token và userId cho tất cả
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.user.id);

    // ✅ Tùy theo role mà lưu thêm
    if (role === 'coach') {
      localStorage.setItem('coachId', data.user.id);
    }

    if (role === 'learner') {
      localStorage.setItem('learnerId', data.user.id);
    }

    // Điều hướng theo role (gợi ý)
    if (role === 'admin') {
      navigate('/admin/dashboard-admin');
    } else if (role === 'coach') {
      navigate('/coach/profile');
    } else {
      navigate('/dashboard');
    }

  } catch (err: any) {
    setError(err.response?.data || 'Đăng nhập thất bại');
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
              className="w-full px-4 py-3 border border-gray-300 rounded-full"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full"
            />
            <div className="text-sm text-black-500">
              <a href="#" className="hover:underline">Quên mật khẩu?</a>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-green-300 to-blue-400 font-semibold"
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
