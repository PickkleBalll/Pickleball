import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../service/AuthService';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { login: setAuthUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const loginData = { email, password };
      const response = await login(loginData);

      // Ánh xạ dữ liệu từ response.data vào User interface
      const userData = {
        fullname: response.data.fullname,
        email: response.data.email,
        phonenumber: '', // API không trả về, để trống
        role: response.data.role.toLowerCase() as 'admin' | 'learner' | 'coach', // Chuẩn hóa role
        avatar: undefined, // API không trả về
      };

      // Hiển thị thông báo thành công
      setSuccessMessage('Đăng nhập thành công');
      setTimeout(() => {
        // Gọi hàm login từ AuthContext với userData và token
        setAuthUser(userData, response.data.token);
      }, 3000); // Chờ 3 giây trước khi điều hướng
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại');
    }
  };

  const handleGoToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="auth-page flex">
      <div className="w-[40%] p-4 bg-white-200 flex align-items-center">
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6 text-center">Welcome Back!</h2>
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
              <a href="#" className="hover:underline">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full text-black font-semibold transition bg-gradient-to-r from-green-300 to-blue-400 hover:opacity-90 auth-button"
            >
              SIGN IN
            </button>
          </form>

          <button
            onClick={handleGoToSignUp}
            className="mt-6 text-sm text-center text-black-300 hover:underline"
          >
            Don't have an account? Register now  →
          </button>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm mt-4">{successMessage}</p>}
        </div>
      </div>

      <div className="w-[60%] h-screen bg-cover bg-center rounded-l-[250px] auth-background"></div>
    </div>
  );
};

export default SignInPage;