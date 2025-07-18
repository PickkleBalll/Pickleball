// components/Notifications.tsx
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { NotificationDto } from "@/types/notification";
import { getNotifications, markAsRead } from "@/services/notificationService";

const NotificationItem = ({ notif, onRead }: { notif: NotificationDto; onRead: () => void }) => (
  <div
    className={`p-6 text-left cursor-pointer hover:bg-gray-50 ${!notif.isRead ? "bg-yellow-50" : ""}`}
    onClick={onRead}
  >
    <p className="text-sm font-semibold">{notif.title}</p>
    <p className="text-sm">{notif.message}</p>
    <p className="text-xs text-gray-400">{new Date(notif.createdAt).toLocaleString()}</p>
  </div>
);

const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getNotifications();
      console.log("✅ Fetched:", data);
      setNotifications(data);
    } catch (err) {
      console.error("❌ useEffect lỗi:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);



  const handleMarkRead = async (id: string) => {
    await markAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <div className="p-3 w-full box-title">
      <div className="p-6 space-y-3 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-black mb-3">NOTIFICATIONS</h2>
          <div className="flex items-center gap-4 mb-3">
            <div className="relative">
              <FiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black" />
              <input
                type="text"
                placeholder="Search"
                className="pl-2 pr-3 py-2 border border-gray-300 rounded text-sm text-gray-700 mb-1 focus:outline-none"
              />
            </div>
            <FaUserCircle className="text-gray-700 text-3xl cursor-pointer hover:text-black mb-3" />
          </div>
        </div>

        {/* Main content */}
        <div className="p-6 bg-white rounded shadow max-w-6xl min-h-[500px]">
          <h2 className="text-3xl text-left font-thin mb-8">Notifications</h2>

          {/* Tabs */}
          <div className="p-4 flex gap-4 mb-4 border-b">
            <button className="font-medium border-b-2 border-black pb-1">All</button>
          </div>

          {/* Loading state */}
          {loading ? (
            <p className="text-gray-500">Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p className="text-gray-400">No notifications found.</p>
          ) : (
            notifications.map((notif) => (
              <NotificationItem
                key={notif.id}
                notif={notif}
                onRead={() => handleMarkRead(notif.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
