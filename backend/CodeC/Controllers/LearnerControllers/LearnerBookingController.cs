using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Dto;
using MyApp.Models.learneR;
using MyApp.Services;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class LearnerBookingController : ControllerBase
{
    private readonly BookingServices _bookingService;
    private readonly ApplicationDbContext _context;

    public LearnerBookingController(BookingServices bookingService, ApplicationDbContext context)
    {
        _bookingService = bookingService;
        _context = context;
    }

    // ✅ 1. Đăng ký khóa học
    //[Authorize(Roles = "Learner")]
    [HttpPost("register")]
    public async Task<IActionResult> RegisterToCourse([FromBody] RegisterCourseDto dto)
    {
        try
        {
            var result = await _bookingService.RegisterCourse(dto.LearnerId, dto.CourseId);
            return Ok(new { message = "Đăng ký thành công", data = result });
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                message = ex.Message,
                inner = ex.InnerException?.Message,
                deeper = ex.InnerException?.InnerException?.Message
            });
        }
    }

    // ✅ 2. Đăng ký khóa học mặc định
    //[Authorize(Roles = "Learner")]
    [HttpPost("register-default/{learnerId}")]
    public async Task<IActionResult> RegisterDefaultCourse(string learnerId)
    {
        try
        {
            var result = await _bookingService.RegisterCourseAuto(learnerId);
            return Ok(new { message = "Đăng ký mặc định thành công", data = result });
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                message = ex.Message,
                inner = ex.InnerException?.Message,
                deeper = ex.InnerException?.InnerException?.Message
            });
        }
    }

    // ✅ 3. Thanh toán khóa học
    [Authorize(Roles = "Learner")]
    [HttpPost("pay/{bookingId}")]
    public async Task<IActionResult> Pay(string bookingId, [FromBody] PaymentRequestDto request)
    {
        var learnerId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (learnerId == null)
            return Unauthorized(new { message = "Không xác định được người dùng." });

        try
        {
            var result = await _bookingService.AddPayment(
                bookingId,
                request.Amount,
                request.Method,
                request.TransactionId,
                learnerId
            );

            if (result == null)
                return NotFound("Booking không tồn tại.");

            return Ok(new
            {
                message = "Thanh toán thành công",
                data = new
                {
                    result.Amount,
                    Method = result.PaymentMethod,
                    result.TransactionId
                }
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                message = ex.Message,
                inner = ex.InnerException?.Message,
                deeper = ex.InnerException?.InnerException?.Message
            });
        }
    }

    // ✅ 4. Lấy lịch sử booking
    //[Authorize(Roles = "Learner")]
    [HttpGet("bookings/{learnerId}")]
    public async Task<IActionResult> GetUserBookings(string learnerId)
    {
        var bookings = await _bookingService.GetBookingsByUser(learnerId);
        return Ok(bookings);
    }

    // ✅ 5. Lịch sử thanh toán
    //[Authorize(Roles = "Learner")]
    [HttpGet("payments/{learnerId}")]
    public async Task<IActionResult> GetUserTransactionHistory(string learnerId)
    {
        var result = await _bookingService.GetPaidBookingsByUser(learnerId);
        return Ok(result);
    }

    // ✅ 6. Booking chi tiết
    //[Authorize(Roles = "Learner")]
    [HttpGet("details/{learnerId}")]
    public async Task<IActionResult> GetBookingsWithDetails(string learnerId)
    {
        var result = await _bookingService.GetBookingsWithDetailsByLearnerId(learnerId);
        return Ok(result);
    }

    // ✅ 7. Lấy Learner theo UserId (nên di chuyển qua LearnersController)
    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetLearnerByUserId(string userId)
    {
        if (!Guid.TryParse(userId, out var userGuid))
            return BadRequest(new { message = "UserId không hợp lệ." });

        var learner = await _context.Learners.FirstOrDefaultAsync(l => l.UserId == userGuid.ToString());

        if (learner == null)
            return NotFound(new { message = "Learner không tồn tại." });

        return Ok(learner);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetBookingById(string id)
    {
        if (!Guid.TryParse(id, out Guid bookingId))
            return BadRequest("Invalid GUID format");

        var booking = await _context.Bookings
            .Include(x => x.Learner)
            .Include(x => x.Course)
            .FirstOrDefaultAsync(x => x.Id == bookingId.ToString());
        if (booking == null)
            return NotFound();

        return Ok(booking);
    }

}
