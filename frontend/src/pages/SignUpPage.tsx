import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [fullname, setFullname] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    // Giả lập đăng ký xong thì chuyển về SignIn
    alert('Sign Up Success!');
    navigate('/signin');
  };
  const handleGoToSignIn = () => {
    navigate('/signin'); // Điều hướng ve lai trang Sign In
  };

  return (
    // Left page
    <div className="auth-page flex">
      <div className="w-[40%] p-4 bg-white-200 flex align-items-center">
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6 text-center">Welcome</h2>
          <form onSubmit={handleSignUp} className="space-y-4">
            <input
              type="text"
              placeholder="Fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 auth-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounder-full focus:outline-none focus:ring-2 focus:ring-blue-400 auth-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 auth-input"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 auth-input"
            />

            <button
              type="submit"
              className="w-full py-3 rounder-full text-black font-semibold transition bg-gradient-to-r from-green-300 to-blue-400 hover:opacity-90 rounded-4xl auth-button"
            >
              SIGN IN
            </button>
          </form>
          <button
            onClick={handleGoToSignIn}
            className="mt-6 text-sm text-center text-black-300 hover:underline"
          >
            Already have an account →
          </button>

        </div>
      </div>
      <div className="w-[60%] h-screen bg-cover bg-center rounded-l-[250px] auth-background"></div>
    </div>





  );
};

export default SignUp;
