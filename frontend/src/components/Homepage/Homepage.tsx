import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const goToSignIn = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-10 rounded shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Our Platform</h1>
        <p className="mb-8">Please sign in to access your dashboard.</p>
        <button
          onClick={goToSignIn}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
