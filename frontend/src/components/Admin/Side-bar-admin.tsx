import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext'; // Đảm bảo import đúng đường dẫn

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth(); // Lấy logout và isAuthenticated từ AuthContext

  const menu = [
    { label: 'Dashboard', path: '/admin/dashboard-admin' },
    { label: 'User', path: '/admin/user-management' },
    { label: 'Content', path: '/admin/content-management' },
    { label: 'Notifications', path: '/admin/notification' },
    { label: 'Log out', path: '' }, // Không cần path cho logout
  ];

  const handleMenuClick = (item: { label: string; path: string }) => {
    if (item.label === 'Log out') {
      logout(); // Gọi logout từ AuthContext, tự động xóa localStorage và chuyển hướng
    } else if (item.path) {
      navigate(item.path);
    }
  };

  if (!isAuthenticated) {
    return null; // Không hiển thị Sidebar nếu chưa đăng nhập
  }

  return (
    <div className="bg-white w-[250px] justify-center px-4 pt-6">
      <h2 className="text-4xl mb-6 underline">PICKLEBALL</h2>
      {menu.map((item) => (
        <button
          key={item.label}
          onClick={() => handleMenuClick(item)}
          className="text-xl w-full text-left py-2 px-3 rounded hover:bg-black hover:text-white mb-1 hover:underline"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}