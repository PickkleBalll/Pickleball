import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const UserManagement = () => {
  return (
    <div className="p-3 w-full box-title">
          <div className="p-6 space-y-3 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-black mb-3">USER</h2>
      
              <div className="flex items-center gap-4 mb-3">
                {/* Search box */}
                <div className="relative">
                  <FiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-2 pr-3 py-2 border border-gray-300 rounded text-sm text-gray-700 mb-1 focus:outline-none"
                  />
                </div>
      
                {/* Avatar */}
                <FaUserCircle className="text-gray-700 text-3xl cursor-pointer hover:text-black mb-3" />
              </div>
              </div>
      <h2 className="text-3xl font-bold mb-12">USER MANAGEMENT</h2>
      {/* Filter buttons + Add User button */}
      <div className="flex h-12 py-2 justify-between items-center mb-3">
        <div className="space-x-3 mb-3">
          {['All', 'Coach', 'Learner'].map((role) => (
            <button
              key={role}
              className="border px-4 py-1 rounded hover:bg-gray-200 box-all mb-3"
            >
              {role}
            </button>
          ))}
        </div>

        <button className="bg-lime-300 hover:bg-lime-400 text-black px-3 py-1 mb-3 rounded-full box-add">
          Add User
        </button>
      </div>

      {/* Table */}
      <table className="w-full border rounded text-left py-3 mb-3 box-table ">
        <thead className="bg-gray-100 space-y-4">
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
          <tr className="border border-gray-100 w-full">
            <td className="p-2">1</td>
            <td>SELINE AYREN</td>
            <td>Learner</td>
            <td>seline@gmail.com</td>
            <td>Active</td>
            <td><button className="text-blue-600 hover-underline">Edit/Remove</button></td>
          </tr>

          {/* Cac data trong */}
          <tr className="border border-gray-200 w-full ">
            <td className="px-4 py-2">&nbsp;</td>
            <td className="px-4 py-2">&nbsp;</td>
            <td className="px-4 py-2">&nbsp;</td>
            <td className="px-4 py-2">&nbsp;</td>
            <td className="px-4 py-2">&nbsp;</td>
            <td><button className="text-blue-600 hover-underline">Edit/Remove</button></td>
          </tr>

          <tr className="border border-gray-200 w-full ">
            <td className="px-4 py-2">&nbsp;</td>
            <td className="px-4 py-2">&nbsp;</td>
            <td className="px-4 py-2">&nbsp;</td>
            <td className="px-4 py-2">&nbsp;</td>
            <td className="px-4 py-2">&nbsp;</td>
            <td><button className="text-blue-600 hover-underline">Edit/Remove</button></td>
          </tr>

          <tr className="border border-gray-200 w-full ">
            <td className="px-4 py-2">&nbsp;</td>
            <td className="px-4 py-2">&nbsp;</td>
            <td className="px-4 py-2">&nbsp;</td>
            <td className="px-4 py-2">&nbsp;</td>
            <td className="px-4 py-2">&nbsp;</td>
            <td><button className="text-blue-600 hover-underline">Edit/Remove</button></td>
          </tr>

          <tr className="border border-gray-200 w-full ">
            <td className="px-4 py-2">&nbsp;</td>
            <td className="px-4 py-2">&nbsp;</td>
            <td className="px-4 py-2">&nbsp;</td>
            <td className="px-4 py-2">&nbsp;</td>
            <td className="px-4 py-2">&nbsp;</td>
            <td><button className="text-blue-600 hover-underline">Edit/Remove</button></td>
          </tr>
        </tbody>

      </table>
    </div>
    </div>
  );
};
export default UserManagement;
