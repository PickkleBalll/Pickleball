import Sidebar from '../components/Dashboard/Admin/Side-bar-admin'; // Sidebar component you showed
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">
        <Outlet />
      </div>
    </div>
  );
}
