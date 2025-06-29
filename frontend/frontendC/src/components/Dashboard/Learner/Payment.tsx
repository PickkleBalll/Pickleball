import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { payCourse, Booking, PaymentResult } from '@/services/bookingService';
import { getBookingById } from '@/services/bookingService';

const Payment: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBookingById(bookingId!);
        setBooking(data);
      } catch (err) {
        console.error('Không tìm thấy booking:', err);
        alert('Không tìm thấy booking');
        navigate('/');
      }
    };

    if (bookingId) fetchBooking();
  }, [bookingId]);

  const handlePayment = async () => {
    const token = localStorage.getItem('token');
    if (!token || !booking) return;

    try {
      setLoading(true);
      const result: PaymentResult = await payCourse(
        booking.id,
        booking.price,
        'MOMO',
        `TXN${Date.now()}`,
        token
      );

      alert('Thanh toán thành công!');
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Lỗi thanh toán:', err);
      alert(err.response?.data?.message || 'Thanh toán thất bại');
    } finally {
      setLoading(false);
    }
  };

  if (!booking) return <p>Đang tải thông tin booking...</p>;

return (
  <div className="flex flex-col items-center py-10">
    <h2 className="text-3xl font-bold mb-4">Thanh toán khóa học</h2>
    <div className="bg-white shadow-lg rounded-2xl p-6 w-[400px]">
      <p className="text-lg font-semibold">Khóa học: {booking.course?.title}</p>
      <p>Số tiền: {booking.course?.price ? Number(booking.course.price).toLocaleString() : '0'}đ</p>
      <button
        onClick={handlePayment}
        className="mt-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold"
        disabled={loading}
      >
        {loading ? 'Đang thanh toán...' : 'Xác nhận thanh toán'}
      </button>
    </div>
  </div>
);
};

export default Payment;
