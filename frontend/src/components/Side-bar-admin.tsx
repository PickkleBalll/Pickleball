import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const menu = [
    { label: 'User', path: '/admin/user-management' },
    { label: 'Content', path: '/admin/content-management' },
    { label: 'Analytics & Reporting', path: '/admin/analytics-reporting' },
    { label: 'Notifications', path: ' ' },
    { label: 'Logout', path: ' ' },
  ];

  return (
    <div className="bg-gray-100 w-[250px] min-h-screen px-4 pt-6">
      <h2 className="text-xl font-bold mb-6">PICKLEBALL</h2>
      {menu.map((item) => (
        <button
          key={item.label}
          onClick={() => navigate(item.path)}
          className="w-full text-left py-2 px-3 rounded hover:bg-black hover:text-white mb-1 hover: underline"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

