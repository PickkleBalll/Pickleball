using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;

namespace MyApp.Controllers.AdminControllers
{
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
