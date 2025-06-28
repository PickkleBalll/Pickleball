using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;

namespace MyApp.Controllers.AdminControllers
{
    /// <summary>
    /// API Dashboard dành cho quản trị viên để thống kê hệ thống và theo dõi các lượt đăng ký.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminDashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminDashboardController(ApplicationDbContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Lấy tổng quan số lượng người dùng, gói học và tổng tiền thanh toán.
        /// </summary>
        /// <remarks>
        /// Trả về số lượng quản trị viên, số gói học hiện có và tổng số tiền đã thanh toán từ tất cả các lượt đăng ký.
        /// </remarks>
        /// <returns>
        /// Một object chứa:
        /// - totalUsers: Tổng số người dùng (Admin),
        /// - totalCoursePackages: Tổng số gói học,
        /// - totalPaymentAmount: Tổng số tiền đã thanh toán.
        /// </returns>
        [HttpGet("summary")]
        public async Task<IActionResult> GetDashboardSummary()
        {
            var totalUsers = await _context.Admins.CountAsync();
            var totalCoursePackages = await _context.CoursePackages.CountAsync();
            var totalPaymentAmount = await _context.Payments.SumAsync(p => p.Amount);

            return Ok(new
            {
                totalUsers,
                totalCoursePackages,
                totalPaymentAmount
            });
        }
        /// <summary>
        /// Lấy danh sách các lượt đăng ký đã thanh toán.
        /// </summary>
        /// <remarks>
        /// Bao gồm thông tin người học, khóa học, huấn luyện viên, số tiền đã thanh toán và tình trạng thanh toán cho HLV.
        /// </remarks>
        /// <returns>
        /// Danh sách các đăng ký đã thanh toán với thông tin chi tiết:
        /// - BookingId, LearnerName, CourseName, CoachName, TotalAmountPaid,
        /// - CoachPaid, CoachAmountPaid, CoachPaidAt, RegisteredAt.
        /// </returns>
        [HttpGet("bookings")]
        public async Task<IActionResult> GetPaidBookings()
        {
            var bookings = await _context.Bookings
                .Where(b => b.IsPaid)
                .Include(b => b.Learner)
                .Include(b => b.Course)
                .Include(b => b.CoachProfile)
                .Include(b => b.Payments)
                .ToListAsync();

            var result = bookings.Select(b => new
            {
                BookingId = b.Id,
                LearnerName = b.Learner.FullName,
                CourseName = b.Course.Title,
                CoachName = b.CoachProfile?.FullName,
                IsPaid = b.IsPaid,
                TotalAmountPaid = b.Payments.Sum(p => p.Amount),
                CoachPaid = b.CoachPaid,
                CoachAmountPaid = b.CoachAmountPaid,
                CoachPaidAt = b.CoachPaidAt,
                RegisteredAt = b.RegistrationDate
            });

            return Ok(result);
        }
    }
}
