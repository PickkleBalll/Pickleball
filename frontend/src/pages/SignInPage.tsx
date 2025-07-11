import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Giả lập xác thực thành công
    localStorage.setItem('auth', 'true');
    navigate('/dashboard');


  };
  const handleGoToSignUp = () => {
    navigate('/signup'); // Điều hướng sang trang Sign up 
  };
  return (

    // Left page
    <div className="auth-page flex">
      <div className="w-[40%] p-4 bg-white-200 flex align-items-center">
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6 text-center">Welcome Back</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 
              auth-input"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 auth-input"
            />

            <div className="text-sm text-black-500">
              <a href="#" className="hover:underline">
                Forgot Password ?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full text-black font-semibold transition bg-gradient-to-r from-green-300 to-blue-400 hover:opacity-90 rounded-4xl auth-button"
            >
              SIGN IN
            </button>
          </form>
          <button
            onClick={handleGoToSignUp}
            className="mt-6 text-sm text-center text-black-300 hover:underline"
          >
            Create your account →
          </button>

        </div>
      </div>
      <div className="w-[60%] h-screen bg-cover bg-center rounded-l-[250px] auth-background"></div>
    </div>

  );
};

export default SignIn;
