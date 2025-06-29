import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const DashboardAdmin = () => {
  const stats = [
    { title: "User", value: "182", color: "bg-red-400" },
    { title: "Content", value: "182", color: "bg-yellow-600" },
    { title: "Package", value: "182", color: "bg-blue-400" },
    { title: "Payment", value: "$200", color: "bg-red-400" },
    { title: "Class", value: "182", color: "bg-yellow-600" },
    { title: "Feedback", value: "182", color: "bg-blue-400" },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-black mb-20">Dashboard</h2>

        <div className="flex items-center gap-4">
          {/* Search box */}
          <div className="relative">
            <FiSearch className="absolute right-3 top-1/6 transform -translate-y-1/2 text-black mb-20" />
            <input
              type="text"
              placeholder="Search"
              className="mb-20 pl-2 pr-3 py-2 border border-gray-300 rounded text-sm text-gray-700 focus:outline-none"
            />
          </div>

          {/* Avatar */}
          <FaUserCircle className="text-gray-700 text-3xl cursor-pointer hover:text-black mb-20" />
        </div>
      </div>

      {/* 6 ô vuông nhỏ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-white shadow-md rounded-lg p-4 h-24"
          >
            <div className={`w-20 h-20 rounded ${item.color} mr-4 -mt-10`} />
            <div className="text-left">
              <p className="text-gray-400 text-sm">{item.title}</p>
              <p className="text-gray-800 font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAdmin;


