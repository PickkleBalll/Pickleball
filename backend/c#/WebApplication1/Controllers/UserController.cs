using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PickleballCourseAPI.DTOs;
using PickleballCourseAPI.Services;
using System.Security.Claims;

namespace PickleballCourseAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Admin lấy tất cả user
        /// </summary>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        /// <summary>
        /// Lấy thông tin user theo ID (chính chủ hoặc admin)
        /// </summary>
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Student,Coach")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var currentUserId = User.FindFirstValue("userId");
            var isAdmin = User.IsInRole("Admin");

            if (id != currentUserId && !isAdmin)
                return Forbid();

            var user = await _userService.GetUserByIdAsync(id);
            if (user == null) return NotFound();

            return Ok(user);
        }

        /// <summary>
        /// Cập nhật thông tin user (chính chủ hoặc admin)
        /// </summary>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Student,Coach")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserDto dto)
        {
            var currentUserId = User.FindFirstValue("userId");
            var isAdmin = User.IsInRole("Admin");

            if (id != currentUserId && !isAdmin)
                return Forbid();

            try
            {
                var updated = await _userService.UpdateUserAsync(id, dto);
                return Ok(new { message = "Cập nhật thành công", data = updated });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Lấy danh sách các huấn luyện viên
        /// </summary>
        [HttpGet("coaches")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCoaches()
        {
            var coaches = await _userService.GetCoachesAsync();
            return Ok(coaches);
        }
    }
}
