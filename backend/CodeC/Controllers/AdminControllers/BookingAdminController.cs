using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;

namespace MyApp.AdminControllers
{
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

        // ✅ Lấy danh sách booking đã thanh toán nhưng chưa trả cho coach
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

        // ✅ Admin xác nhận đã trả tiền cho coach
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
