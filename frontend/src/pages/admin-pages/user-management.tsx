const UserManagement = () => {
  return (
    <div className="p-6 w-full box-title">
      <h2 className="text-2xl font-bold h-14 mb-4">USER MANAGEMENT</h2>
      <input
        type="text"
        placeholder="Search by name or email"
        className="border px-3 py-1 h-12 rounded w-lg mb-4 box-search" />

      {/* Filter buttons + Add User button */}
      <div className="flex h-12 py-2 justify-between items-center mb-4">
        <div className="space-x-2">
          {['All', 'Coach', 'Learner'].map((role) => (
            <button
              key={role}
              className="border px-4 py-1 rounded hover:bg-gray-200 box-all"
            >
              {role}
            </button>
          ))}
        </div>

        <button className="bg-lime-300 hover:bg-lime-400 text-black px-4 py-1 rounded-full box-add">
          Add User
        </button>
      </div>

      {/* Table */}
      <table className="w-full border rounded text-left py-2 box-table">
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
  );
};
export default UserManagement;
