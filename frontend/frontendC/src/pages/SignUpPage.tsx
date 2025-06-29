import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@/services/authService';

const SignUp = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'Learner' | 'Admin' | 'Coach'>('Learner');
  const [gender, setGender] = useState('Nam');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp ❌');
      return;
    }

    try {
      const data = {
        fullname,
        email,
        password,
        phoneNumber: phonenumber,
        role,
        gender,
        dateOfBirth,
        specialty: role === 'Coach' ? specialty : undefined,
      };

      await registerUser(data);

      alert('Đăng ký thành công! 🎉 Vui lòng đăng nhập ✨');
      navigate('/signin');
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.title ||
        'Đăng ký thất bại, vui lòng thử lại! ❌';

      setError(message);
    }
  };

  const handleGoToSignIn = () => {
    navigate('/signin');
  };

  return (
    <div className="auth-page flex h-screen">
      <div className="w-[40%] p-10 flex flex-col justify-center bg-white shadow-xl">
        <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">Create an Account</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            placeholder="Fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="tel"
            placeholder="Phonenumber"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="auth-input"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'Learner' | 'Admin' | 'Coach')}
            className="auth-input"
          >
            <option value="learner">Learner</option>
            <option value="admin">Admin</option>
            <option value="coach">Coach</option>
          </select>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="auth-input"
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
            className="auth-input"
          />
          {role === 'Coach' && (
            <input
              type="text"
              placeholder="Specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              required
              className="auth-input"
            />
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-green-400 to-blue-500 hover:opacity-90 transition"
          >
            SIGN UP
          </button>
        </form>
        <button
          onClick={handleGoToSignIn}
          className="mt-6 text-sm text-center text-blue-500 hover:underline"
        >
          Already have an account →
        </button>
      </div>
      <div className="w-[60%] h-full bg-cover bg-center rounded-l-[250px] auth-background" />
    </div>
  );
};

export default SignUp;
