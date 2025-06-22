using Microsoft.AspNetCore.Mvc;
using MyApp.Models;
using MyApp.Services;
using MyApp.Dto;
using MyApp.Models.learneR;
namespace MyApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LearnerBookingController : ControllerBase
    {
        private readonly BookingServices _bookingService;

        public LearnerBookingController(BookingServices bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpPost("register-course")]
        public async Task<IActionResult> RegisterCourse([FromBody] Booking booking)
        {
            var result = await _bookingService.RegisterCourse(booking);
            return Ok(result);
        }

        [HttpPost("pay/{id}")]
        public async Task<IActionResult> Pay(int id, [FromBody] PaymentRequestDto dto)
        {
            var result = await _bookingService.AddPayment(id, dto.Amount, dto.Method, dto.TransactionId);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpGet("user/{learnerId}")]
        public async Task<IActionResult> GetUserBookings(string learnerId)
        {
            var bookings = await _bookingService.GetBookingsByUser(learnerId);
            return Ok(bookings);
        }
        [HttpGet("history/user/{learnerId}")] //moi them
        public async Task<IActionResult> GetUserTransactionHistory(string learnerId)
        {
            var result = await _bookingService.GetPaidBookingsByUser(learnerId);
            return Ok(result);
        }
        [HttpGet("learner/{learnerId}/bookings")]
public async Task<IActionResult> GetBookingsWithDetails(string learnerId)
{
    var result = await _bookingService.GetBookingsWithDetailsByLearnerId(learnerId);
    return Ok(result);
}
    }
}
