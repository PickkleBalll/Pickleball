import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Admin/Side-bar-admin";

const AdminLayout = () => {
  return (
    <div className="admin-page w-full flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Nội dung chính */}
      <div className="flex-1 h-screen bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

