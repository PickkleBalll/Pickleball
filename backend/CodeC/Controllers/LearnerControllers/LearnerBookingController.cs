using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyApp.Dto;
using MyApp.Models.learneR;
using MyApp.Services;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class LearnerBookingController : ControllerBase
{
    private readonly BookingServices _bookingService;

    public LearnerBookingController(BookingServices bookingService)
    {
        _bookingService = bookingService;
    }

    // ✅ Đăng ký khóa học cụ thể với CourseId
    [Authorize(Roles = "Learner")]
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


    // ✅ Đăng ký khóa học mặc định nếu người dùng chưa chọn
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

    // ✅ Thanh toán khóa học
    [Authorize(Roles = "Learner")]
    [HttpPost("pay/{bookingId}")]
    public async Task<IActionResult> Pay(string bookingId, [FromBody] PaymentRequestDto request)
    {
        // 🔐 Lấy learnerId từ token
        var learnerId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (learnerId == null)
            return Unauthorized(new { message = "Không xác định được người dùng." });

        try
        {
            var result = await _bookingService.AddPayment(bookingId, request.Amount, request.Method, request.TransactionId, learnerId);

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

        // ✅ Lịch sử tất cả booking của học viên
        //[Authorize(Roles = "Learner")]
         [HttpGet("user/{learnerId}")]
        public async Task<IActionResult> GetUserBookings(string learnerId)
        {
            var bookings = await _bookingService.GetBookingsByUser(learnerId);
            return Ok(bookings);
        }

    // ✅ Lịch sử đã thanh toán
    //[Authorize(Roles = "Learner")]
    [HttpGet("user/{learnerId}/payments")]
    public async Task<IActionResult> GetUserTransactionHistory(string learnerId)
    {
        var result = await _bookingService.GetPaidBookingsByUser(learnerId);
        return Ok(result);
    }

    // ✅ Booking kèm thông tin chi tiết
    //[Authorize(Roles = "Learner")]
    [HttpGet("user/{learnerId}/details")]
    public async Task<IActionResult> GetBookingsWithDetails(string learnerId)
    {
        var result = await _bookingService.GetBookingsWithDetailsByLearnerId(learnerId);
        return Ok(result);
    }
}
