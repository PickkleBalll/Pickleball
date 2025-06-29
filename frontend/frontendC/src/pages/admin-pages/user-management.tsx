import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { getAllUsers } from "@/services/adminService";
import axios from "axios";

interface User {
  id: string;
  email: string;
  fullname: string;
  phoneNumber: string;
  role: string;
  isVerified: boolean;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response);
    } catch (err) {
      console.error("Lỗi khi lấy user:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`https://localhost:5001/api/admin/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa user:", error);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSave = async () => {
  if (!selectedUser) return;
  try {
    const response = await axios.put(
      `https://localhost:5001/api/admin/users/${selectedUser.id}`,
      selectedUser
    );

    const updatedUser = response.data;

    setUsers((prev) =>
  prev.map((user) =>
    user.id === selectedUser.id ? { ...selectedUser } : user
  )
);
    setShowModal(false);
    setSelectedUser(null);
  } catch (error) {
    console.error("Lỗi khi cập nhật user:", error);
  }
};


  const handleFilter = (role: string) => {
    setFilterRole(role);
  };

  const filteredUsers = users.filter((user) => {
    return (
      (filterRole === "All" || user.role.toLowerCase() === filterRole.toLowerCase()) &&
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-3 w-full box-title">
      <div className="p-6 space-y-3 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-black mb-3">USER</h2>

          <div className="flex items-center gap-4 mb-3">
            <div className="relative">
              <FiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-2 pr-3 py-2 border border-gray-300 rounded text-sm text-gray-700 mb-1 focus:outline-none"
              />
            </div>
            <FaUserCircle className="text-gray-700 text-3xl cursor-pointer hover:text-black mb-3" />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-12">USER MANAGEMENT</h2>

        <div className="flex h-12 py-2 justify-between items-center mb-3">
          <div className="space-x-3 mb-3">
            {["All", "Coach", "Learner"].map((role) => (
              <button
                key={role}
                onClick={() => handleFilter(role)}
                className={`transition-all duration-150 ease-in-out border px-4 py-1 rounded hover:bg-gray-200 active:bg-gray-400 active:text-black box-all mb-3 ${
                  filterRole === role
                    ? "bg-gray-300 font-bold text-black"
                    : "text-gray-700"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <button className="bg-lime-300 hover:bg-lime-400 text-black px-3 py-1 mb-3 rounded-full box-add">
            Add User
          </button>
        </div>

        <table className="w-full border rounded text-left py-3 mb-3 box-table">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className="border border-gray-100 w-full">
                <td className="p-2">{index + 1}</td>
                <td>{user.fullname}</td> 
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.isVerified ? "Active" : "Inactive"}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:underline active:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:underline active:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Modal */}
       {showModal && selectedUser && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Edit User</h2>

      {/* Email (readonly) */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="text"
          value={selectedUser.email}
          readOnly
          className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-600 cursor-not-allowed"
        />
      </div>

      {/* Full Name */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Full Name</label>
        <input
          type="text"
          value={selectedUser.fullname}
          onChange={(e) =>
            setSelectedUser({ ...selectedUser, fullname: e.target.value })
          }
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* Phone Number */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Phone Number</label>
        <input
          type="text"
          value={selectedUser.phoneNumber}
          onChange={(e) =>
            setSelectedUser({ ...selectedUser, phoneNumber: e.target.value })
          }
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* Role */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Role</label>
        <select
          value={selectedUser.role}
          onChange={(e) =>
            setSelectedUser({ ...selectedUser, role: e.target.value })
          }
          className="w-full px-3 py-2 border rounded"
        >
          <option value="Learner">Learner</option>
          <option value="Coach">Coach</option>
        </select>
      </div>

      {/* Verified Checkbox */}
      <div className="mb-3 flex items-center gap-2">
        <input
          type="checkbox"
          checked={selectedUser.isVerified}
          onChange={(e) =>
            setSelectedUser({
              ...selectedUser,
              isVerified: e.target.checked,
            })
          }
        />
        <label>Verified</label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => {
            setShowModal(false);
            setSelectedUser(null);
          }}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default UserManagement;
