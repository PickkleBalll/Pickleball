using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyApp.Dto;
using MyApp.Models.learneR;
using MyApp.Services;
using System.Security.Claims;
/// <summary>
/// API dành cho học viên để đăng ký và thanh toán các gói học.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class LearnerBookingController : ControllerBase
{
    private readonly BookingServices _bookingService;

    public LearnerBookingController(BookingServices bookingService)
    {
        _bookingService = bookingService;
    }
    /// <summary>
    /// Học viên đăng ký một khóa học cụ thể (theo CourseId).
    /// </summary>
    /// <param name="dto">Dữ liệu gồm LearnerId và CourseId</param>
    /// <returns>Thông báo đăng ký thành công và thông tin khóa học</returns>
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

    /// <summary>
    /// Học viên đăng ký một khóa học mặc định nếu chưa chọn khóa học cụ thể.
    /// </summary>
    /// <param name="learnerId">ID của học viên</param>
    /// <returns>Thông báo và thông tin khóa học mặc định</returns>
    // ✅ Đăng ký khóa học mặc định nếu người dùng chưa chọn
    [Authorize(Roles = "Learner")]
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
    /// <summary>
    /// Học viên thanh toán cho một booking đã đăng ký.
    /// </summary>
    /// <param name="bookingId">ID của booking</param>
    /// <param name="request">Thông tin thanh toán: số tiền, phương thức, mã giao dịch</param>
    /// <returns>Thông báo thanh toán thành công và chi tiết giao dịch</returns>
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
    /// <summary>
    /// Lấy danh sách tất cả các booking của một học viên.
    /// </summary>
    /// <param name="learnerId">ID học viên</param>
    /// <returns>Danh sách booking</returns>
    // ✅ Lịch sử tất cả booking của học viên
    [Authorize(Roles = "Learner")]
         [HttpGet("user/{learnerId}")]
        public async Task<IActionResult> GetUserBookings(string learnerId)
        {
            var bookings = await _bookingService.GetBookingsByUser(learnerId);
            return Ok(bookings);
        }
    /// <summary>
    /// Lấy danh sách tất cả các giao dịch thanh toán của học viên.
    /// </summary>
    /// <param name="learnerId">ID học viên</param>
    /// <returns>Danh sách giao dịch thanh toán</returns>
    // ✅ Lịch sử đã thanh toán
    [Authorize(Roles = "Learner")]
    [HttpGet("user/{learnerId}/payments")]
    public async Task<IActionResult> GetUserTransactionHistory(string learnerId)
    {
        var result = await _bookingService.GetPaidBookingsByUser(learnerId);
        return Ok(result);
    }
    /// <summary>
    /// Lấy danh sách booking cùng thông tin chi tiết khóa học và huấn luyện viên.
    /// </summary>
    /// <param name="learnerId">ID học viên</param>
    /// <returns>Danh sách booking có thông tin chi tiết</returns>
    // ✅ Booking kèm thông tin chi tiết
    [Authorize(Roles = "Learner")]
    [HttpGet("user/{learnerId}/details")]
    public async Task<IActionResult> GetBookingsWithDetails(string learnerId)
    {
        var result = await _bookingService.GetBookingsWithDetailsByLearnerId(learnerId);
        return Ok(result);
    }
}
