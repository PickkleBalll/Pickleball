using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;

namespace MyApp.Controllers
{
    [ApiController]
    [Route("api/admin/users")]
    [Authorize(Roles = "Admin")]
    public class AdminUserController : ControllerBase
    {
        private readonly MyAppDbContext _context;

        public AdminUserController(MyAppDbContext context)
        {
            _context = context;
        }

        // Lấy tất cả user
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users
                .Select(u => new
                {
                    u.Id,
                    u.Email,
                    u.Role,
                    u.IsVerified
                })
                .ToListAsync();

            return Ok(users);
        }

        // Lấy user chưa xác minh
        [HttpGet("pending")]
        public async Task<IActionResult> GetUnverifiedUsers()
        {
            var users = await _context.Users
                .Where(u => !u.IsVerified)
                .Select(u => new
                {
                    u.Id,
                    u.Email,
                    u.Role,
                    u.IsVerified
                })
                .ToListAsync();

            return Ok(users);
        }

        // Xác minh user
        [HttpPut("verify/{id}")]
        public async Task<IActionResult> VerifyUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound("User not found.");

            user.IsVerified = true;
            await _context.SaveChangesAsync();

            return Ok(new { message = "User verified successfully." });
        }

        // Xóa user
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound("User not found.");

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully." });
        }
    }
}
