using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;

namespace MyApp.AdminControllers
{
    /// <summary>
    /// API dành cho quản trị viên để theo dõi và xử lý thanh toán cho huấn luyện viên.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class BookingAdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookingAdminController(ApplicationDbContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Lấy danh sách các lượt đăng ký (booking) đã được học viên thanh toán nhưng chưa thanh toán cho huấn luyện viên.
        /// </summary>
        /// <returns>
        /// Danh sách các booking chưa trả tiền cho coach, bao gồm thông tin học viên, khóa học và huấn luyện viên.
        /// </returns>
        //  Lấy danh sách booking đã thanh toán nhưng chưa trả cho coach
        [HttpGet("unpaid-to-coach")]
        public async Task<IActionResult> GetUnpaidCoachBookings()
        {
            var bookings = await _context.Bookings
                .Include(b => b.Learner)
                .Include(b => b.Course)
                .Include(b => b.CoachProfile)
                .Where(b => b.IsPaid && !b.CoachPaid)
                .ToListAsync();

            return Ok(bookings);
        }
        /// <summary>
        /// Admin xác nhận đã thanh toán cho huấn luyện viên.
        /// </summary>
        /// <param name="bookingId">ID của lượt booking đã được học viên thanh toán</param>
        /// <param name="amount">Số tiền mà hệ thống trả cho huấn luyện viên</param>
        /// <returns>
        /// Trả về thông báo đã thanh toán cùng với thông tin cập nhật của booking.
        /// </returns>
        /// <remarks>
        /// Endpoint này đánh dấu trạng thái `CoachPaid = true`, ghi lại ngày thanh toán và số tiền được trả cho huấn luyện viên.
        /// </remarks>
        //  Admin xác nhận đã trả tiền cho coach
        [HttpPut("pay-coach/{bookingId}")]
        public async Task<IActionResult> PayCoach(string bookingId, [FromBody] decimal amount)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);
            if (booking == null || !booking.IsPaid)
                return BadRequest("Booking không tồn tại hoặc chưa được học viên thanh toán.");

            booking.CoachPaid = true;
            booking.CoachPaidAt = DateTime.UtcNow;
            booking.CoachAmountPaid = amount;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Đã thanh toán cho HLV.", booking });
        }
    }
}
