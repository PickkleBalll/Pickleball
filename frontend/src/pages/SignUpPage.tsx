import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, RegisterData } from '../service/AuthService'; // Import từ file API

const SignUp = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'learner' | 'admin' | 'coach'>('learner');
  const [bio, setBio] = useState(''); // Thêm state cho bio
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const userData: RegisterData = {
      FullName: fullname,
      email,
      password,
      role,
      phone: phonenumber,
      bio, // Thêm bio
    };

    try {
      const response = await register(userData);
      alert(response || 'Registration successful! Please log in');
      navigate('/signin');
    } catch (error: unknown) {
      let message = 'Registration failed';
      if (error instanceof Error) {
        message = error.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToSignIn = () => {
    navigate('/signin');
  };

  return (
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
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 auth-input"
            />
            <input
              type="tel"
              placeholder="Phonenumber"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 auth-input"
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
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 auth-input"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'learner' | 'admin' | 'coach')}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 auth-input"
            >
              <option value="learner">Learner</option>
              <option value="admin">Admin</option>
              <option value="coach">Coach</option>
            </select>
            <textarea
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 auth-input"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full text-black font-semibold transition bg-gradient-to-r from-green-300 to-blue-400 hover:opacity-90 auth-button"
            >
              {loading ? 'Signing up...' : 'SIGN UP'}
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