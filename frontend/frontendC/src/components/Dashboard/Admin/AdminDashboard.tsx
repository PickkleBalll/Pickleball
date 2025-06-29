import { useEffect, useState } from "react";
import { getSummary, getBookings } from "@/services/adminService";

interface DashboardSummary {
  totalUsers: number;
  totalCoursePackages: number;
  totalPaymentAmount: number;
}

interface Booking {
  BookingId: number;
  LearnerName: string;
  CourseName: string;
  CoachName: string | null;
  IsPaid: boolean;
  TotalAmountPaid: number;
  CoachPaid: boolean;
  CoachAmountPaid: number;
  CoachPaidAt: string | null;
  RegisteredAt: string;
}

const AdminDashboard = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryData, bookingsData] = await Promise.all([
          getSummary(),
          getBookings(),
        ]);
        setSummary(summaryData as DashboardSummary);
        setBookings(bookingsData as Booking[]);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Không thể tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <p className="text-center mt-8 text-gray-500">Đang tải dữ liệu...</p>;

  if (error)
    return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Bảng điều khiển quản trị</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-100 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Tổng số User</h3>
          <p className="text-2xl font-bold">{summary?.totalUsers}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Gói khóa học</h3>
          <p className="text-2xl font-bold">{summary?.totalCoursePackages}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Tổng doanh thu</h3>
          <p className="text-2xl font-bold">
            {summary?.totalPaymentAmount?.toLocaleString?.() ?? "0"} đ
          </p>
        </div>
      </div>

      {/* Bookings Table */}
      <h3 className="text-xl font-semibold mb-4">Danh sách đơn đã thanh toán</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-xl">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Học viên</th>
              <th className="py-2 px-4 border">Khóa học</th>
              <th className="py-2 px-4 border">Huấn luyện viên</th>
              <th className="py-2 px-4 border">Thanh toán</th>
              <th className="py-2 px-4 border">Đã trả coach</th>
              <th className="py-2 px-4 border">Ngày đăng ký</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, index) => (
              <tr key={b.BookingId} className="text-center">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{b.LearnerName}</td>
                <td className="py-2 px-4 border">{b.CourseName}</td>
                <td className="py-2 px-4 border">{b.CoachName || "N/A"}</td>
                <td className="py-2 px-4 border">
                  {b.TotalAmountPaid?.toLocaleString?.() ?? "0"} đ
                </td>
                <td className="py-2 px-4 border">
                  {b.CoachPaid
                    ? `${b.CoachAmountPaid?.toLocaleString?.() ?? "0"} đ (${b.CoachPaidAt ? new Date(b.CoachPaidAt).toLocaleDateString() : "?"})`
                    : "Chưa trả"}
                </td>
                <td className="py-2 px-4 border">
                  {new Date(b.RegisteredAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
