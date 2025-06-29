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
        /// API tra ve thong tin cua user dang dang nhap
        /// Yeu cau phai co token hop le
        /// </summary>
        [HttpGet("me")]
        [Authorize]
        public IActionResult Me()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "Unknown";
            var email = User.FindFirstValue(ClaimTypes.Email) ?? "Unknown";
            var role = User.FindFirstValue(ClaimTypes.Role) ?? "Unknown";
            var allClaims = User.Claims.Select(c => new { c.Type, c.Value }).ToList();
            return Ok(new { claims = allClaims });
        
        }

        /// <summary>
        /// API chi cho phep user co role Admin truy cap
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




