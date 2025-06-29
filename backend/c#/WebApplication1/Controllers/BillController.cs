using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PickleballCourseAPI.DTOs;
using PickleballCourseAPI.Services;
using System.Security.Claims;

namespace PickleballCourseAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BillController : ControllerBase
    {
        private readonly IBillService _billService;

        public BillController(IBillService billService)
        {
            _billService = billService;
        }

        /// <summary>
        /// Admin xem tất cả hóa đơn
        /// </summary>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllBills()
        {
            var bills = await _billService.GetAllBillsAsync();
            return Ok(bills);
        }

        /// <summary>
        /// Xem chi tiết hóa đơn theo ID (cá nhân hoặc admin)
        /// </summary>
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetBillById(string id)
        {
            var bill = await _billService.GetBillByIdAsync(id);
            if (bill == null) return NotFound();

            var userId = User.FindFirstValue("userId");
            var role = User.FindFirstValue(ClaimTypes.Role);

            if (role != "Admin" && bill.UserId != userId)
                return Forbid("Bạn không có quyền xem hóa đơn này.");

            return Ok(bill);
        }

        /// <summary>
        /// Học viên tạo hóa đơn cho khóa học
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> CreateBill([FromBody] CreatePaymentDto dto)
        {
            var userId = User.FindFirstValue("userId");

            try
            {
                var bill = await _billService.CreateBillAsync(userId, dto);
                return Ok(bill);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Học viên thanh toán hóa đơn
        /// </summary>
        [HttpPost("process")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> ProcessPayment([FromBody] ProcessPaymentDto dto)
        {
            try
            {
                var bill = await _billService.ProcessPaymentAsync(dto);
                var userId = User.FindFirstValue("userId");

                if (bill.UserId != userId)
                    return Forbid("Bạn không thể thanh toán hóa đơn của người khác.");

                return Ok(bill);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Học viên xem tất cả hóa đơn của mình
        /// </summary>
        [HttpGet("my")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> GetMyBills()
        {
            var userId = User.FindFirstValue("userId");
            var bills = await _billService.GetBillsByUserAsync(userId);
            return Ok(bills);
        }
    }
}
