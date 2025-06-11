import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const ContentManagement = () => {
  return (

    <div className="p-3 w-full box-title">
      <div className=" p-6 space-y-3 bg-gray-100 min-h-screen">
        {/* header */}
        <div className="flex justify-between items-center ">
          <h2 className=" text-2xl font-semibold text-black mb-3 ">CONTENT</h2>
          <div className=" flex items-center gap-4 mb-3">

            {/* avatar */}
            <div className="relative">
              <FaUserCircle className="text-gray-700 text-3xl cursor-pointer hover:text-black mb-3" />
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-12">CONTENT MANAGEMENT</h2>
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
          {/* Search box */}
          <div className="relative">
            <FiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black" />
            <input
              type="text"
              placeholder="Search"
              className="pl-2 pr-3 py-2 border border-gray-300 rounded text-sm text-gray-700 mb-1 focus:outline-none"
            />
          </div>
          
        </div>
        {/* Table */}
          <table className=" w-full border rounded text-left py-3 mb-3 box-table">
             <thead className="bg-gray-100 space-x-3 space-y-4">
              <tr>
                <th className="space-x-3 p-4">#</th>
                <th>Name</th>
                <th>Role</th>
                <th>Title</th>
                <th>Type</th>
                <th>Upload</th>
                <th>Action</th>
              </tr>

             </thead>
             <tbody>
              <tr className=" border border-gray-100 w-full">
                <td className="space-x-3 p-4">1</td>
                <td>SELENE ARVEN</td>
                <td>Learner</td>
                <td>My Video</td>
                <td>Video</td>
                <td>01-05-2025</td>
                <td><button className="text-blue-600 hover-underline"> View/Edit</button></td>
              </tr>

              <tr className="border border-gray-100 w-full">
                <td className="space-x-3 p-4">2</td>
                <td>JANE JOE</td>
                <td>Coach</td>
                <td>Tutorials</td>
                <td>PDF</td>
                <td>01-05-2025</td>
                <td><button className="text-blue-600 hover-underline">View/Edit</button></td>
              </tr>
             </tbody>
          </table>
      </div>
    </div>

  );
};

export default ContentManagement;