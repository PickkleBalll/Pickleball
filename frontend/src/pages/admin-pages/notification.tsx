import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const NotificationItem = ({ message, time }: { message: string; time: string }) => (
  <div className="p-6 text-left">
    <p className="text-sm ">
      <span className="p-2 font-semibold">Update profile:</span> {message}
    </p>
    <p className="p-2 text-xs text-gray-400">{time}</p>
  </div>
);

const Notifications = () => {
  return (

    <div className="p-3 w-full box-title">
      <div className="p-6 space-y-3 bg-gray-100 min-h-screen ">
        {/* header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-black mb-3">NOTIFICATIONS</h2>
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
        {/* Khung trang */}
        <div className="p-6 bg-white rounded shadow max-w-6xl min-h-[500px]">
          <h2 className="text-3xl text-left font-thin mb-8">Notifications</h2>
          {/* Tabs */}
          <div className="p-8 flex gap-4 mb-4">
            <button className="
        font-medium border-b-2 border-black pb-1 mb-4">All</button>
            <button className="text-gray-500 mb-4">Unread</button>
          </div>
          {/* Notification list */}
          <NotificationItem message="Mias changed avatar" time="12AM 02-10-2020" />
          <NotificationItem message="Mias changed avatar" time="12AM 02-10-2020" />
        </div>
      </div>
    </div>
  );
};

export default Notifications;