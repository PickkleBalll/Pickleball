import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Gọi API login ở đây
    const success = true; // giả định

    if (success) {
      navigate('/dashboard'); // hoặc / nếu muốn
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Đăng nhập</h1>
      {/* form */}
      <button onClick={handleLogin} className="btn btn-primary mt-4">
        Đăng nhập
      </button>
    </div>
  );
};

export default SignInPage;
