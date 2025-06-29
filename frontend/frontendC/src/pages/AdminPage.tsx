import {NavLink } from 'react-router-dom';

const AdminPage: React.FC = () => {
  return (
    <nav className="flex space-x-8">
      <NavLink
        to="/adminDashboard"
        className={({ isActive }) =>
          `text-xl font-normal ${isActive ? 'text-[#212121]' : 'text-[#727272]'}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/adminUser"
        className={({ isActive }) =>
          `text-xl font-normal ${isActive ? 'text-[#212121]' : 'text-[#727272]'}`
        }
      >
        Coach
      </NavLink>
      <NavLink
        to="/adminContent"
        className={({ isActive }) =>
          `text-xl font-normal ${isActive ? 'text-[#212121]' : 'text-[#727272]'}`
        }
      >
        Learn
      </NavLink>
      <NavLink
        to="/adminNotifications"
        className={({ isActive }) =>
          `text-xl font-normal ${isActive ? 'text-[#212121]' : 'text-[#727272]'}`
        }
      >
        Payment
      </NavLink>
    </nav>
  );
};
export default AdminPage;
