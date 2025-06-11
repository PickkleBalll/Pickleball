import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const menu = [
    { label: 'Dashboard', path: '/admin/dashboard-admin' },
    { label: 'User', path: '/admin/user-management' },
    { label: 'Content', path: '/admin/content-management' },
    { label: 'Notifications', path: '/admin/notification ' },
    { label: 'Log out', path: ' ' },
  ];

  return (
    <div className="bg-white w-[250px] justify-center px-4 pt-6 ">
      <h2 className="text-4xl mb-6 underline ">PICKLEBALL</h2>
      {menu.map((item) => (
        <button
          key={item.label}
          onClick={() => navigate(item.path)}
          className=" text-xl w-full text-left py-2 px-3 rounded hover:bg-black hover:text-white mb-1 hover: underline"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

