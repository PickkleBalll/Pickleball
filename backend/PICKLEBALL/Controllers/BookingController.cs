using Microsoft.AspNetCore.Mvc;
using PICKLEBALL.Model;
using PICKLEBALL.Services;
using PICKLEBALL.Dto;
namespace PICKLEBALL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly BookingService _bookingService;

        public BookingController(BookingService bookingService)
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
        public async Task<IActionResult> GetUserBookings(int learnerId)
        {
            var bookings = await _bookingService.GetBookingsByUser(learnerId);
            return Ok(bookings);
        }
        [HttpGet("history/user/{learnerId}")] //moi them
        public async Task<IActionResult> GetUserTransactionHistory(int learnerId)
        {
            var result = await _bookingService.GetPaidBookingsByUser(learnerId);
            return Ok(result);
        }
    }
}
