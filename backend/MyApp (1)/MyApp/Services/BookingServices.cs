using Microsoft.EntityFrameworkCore;
using MyApp.Models.learneR;
using MyApp.Models.coachH;
using MyApp.Data;

namespace MyApp.Services
{
    public class BookingServices
    {
        private readonly ApplicationDbContext _context;

        public BookingServices(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Booking> RegisterCourse(Booking booking)
        {
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return booking;
        }
        // Thêm thanh toán
        public async Task<Payment> AddPayment(int bookingId, decimal amount, string paymentMethod, string transactionId)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);
            if (booking == null) return null;

            var payment = new Payment
            {
                BookingId = bookingId,
                Amount = amount,
                PaymentMethod = paymentMethod,
                TransactionId = transactionId,
                IsSuccess = true
            };

            _context.Payments.Add(payment);

            // Cập nhật trạng thái booking
            booking.IsPaid = true;

            await _context.SaveChangesAsync();
            return payment;
        }
        // Lấy các booking đã thanh toán
        public async Task<List<Booking>> GetPaidBookingsByUser(string learnerId) //moi them
        {
            return await _context.Bookings
                .Where(b => b.LearnerId == learnerId && b.IsPaid)
                .ToListAsync();
        }
        // Lấy các booking của người dùng
        public async Task<List<Booking>> GetBookingsByUser(string learnerId)
        {
            return await _context.Bookings.Where(b => b.LearnerId == learnerId).ToListAsync();
        }
        public async Task<List<Payment>> GetUserPayments(string learnerId)
        {
            return await _context.Payments
                .Include(p => p.Booking)
                .Where(p => p.Booking.LearnerId == learnerId)
                .OrderByDescending(p => p.PaidAt)
                .ToListAsync();
        }
        public async Task<List<Booking>> GetBookingsWithDetailsByLearnerId(string learnerId)
{
    return await _context.Bookings
        .Include(b => b.Lesson)
        .Include(b => b.CoachProfile)
        .Where(b => b.LearnerId == learnerId)
        .ToListAsync();
}

    }
}
