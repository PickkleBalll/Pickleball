using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MyApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        /// <summary>
        /// API trả về thông tin của user đang đăng nhập
        /// Yêu cầu phải có token hợp lệ
        /// </summary>
        [HttpGet("me")]
        [Authorize]
        public IActionResult Me()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "Unknown";
            var email = User.FindFirstValue(ClaimTypes.Email) ?? "Unknown";
            var role = User.FindFirstValue(ClaimTypes.Role) ?? "Unknown";

            // Nếu cần, có thể thêm logging hoặc xử lý lỗi ở đây

            return Ok(new
            {
                userId,
                email,
                role
            });
        }

        /// <summary>
        /// API chỉ cho phép user có role Admin truy cập
        /// </summary>
        [HttpGet("admin-data")]
        [Authorize(Roles = "Admin")]
        public IActionResult AdminData()
        {
            return Ok(new { message = "This is protected admin data." });
        }

        /// <summary>
        /// API cho phép user có role User hoặc Admin truy cập
        /// </summary>
        [HttpGet("user-data")]
        [Authorize(Roles = "User,Admin")]
        public IActionResult UserData()
        {
            return Ok(new { message = "This is protected data for users and admins." });
        }
    }
}




