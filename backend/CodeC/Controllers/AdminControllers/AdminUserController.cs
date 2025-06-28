using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Models.admin_login;

namespace MyApp.Controllers.admin_login
{
    /// <summary>
    /// API dành cho quản trị viên để quản lý người dùng (Admin).
    /// </summary>
    [ApiController]
    [Route("api/admin/users")]
    [Authorize(Roles = "Admin")] // Roles = Admin chữ hoa
    public class AdminUserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminUserController(ApplicationDbContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Lấy danh sách toàn bộ người dùng (admin).
        /// </summary>
        /// <returns>
        /// Danh sách gồm: Id, Email, Role, IsVerified.
        /// </returns>
        //  Lấy toàn bộ user
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Admins
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
        /// <summary>
        /// Xóa một người dùng theo ID.
        /// </summary>
        /// <param name="id">ID của người dùng cần xóa</param>
        /// <returns>
        /// Trả về thông báo nếu xóa thành công hoặc lỗi nếu không tìm thấy người dùng.
        /// </returns>
        //  Xóa user
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _context.Admins.FindAsync(id);
            if (user == null) return NotFound("User not found.");

            _context.Admins.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully." });
        }
        /// <summary>
        /// Tạo mới một người dùng (admin).
        /// </summary>
        /// <param name="newUser">Thông tin người dùng mới</param>
        /// <returns>
        /// Trả về thông báo nếu tạo thành công hoặc lỗi nếu email đã tồn tại hoặc dữ liệu không hợp lệ.
        /// </returns>
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] Admin newUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Kiểm tra email đã tồn tại
            if (await _context.Admins.AnyAsync(u => u.Email == newUser.Email))
                return BadRequest("Email already exists.");

            newUser.Id = Guid.NewGuid().ToString();
            newUser.CreatedAt = DateTime.UtcNow;
            newUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newUser.PasswordHash); // Hash mật khẩu
            _context.Admins.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User created successfully." });
        }
        /// <summary>
        /// Cập nhật thông tin người dùng theo ID.
        /// </summary>
        /// <param name="id">ID của người dùng cần cập nhật</param>
        /// <param name="updatedUser">Dữ liệu người dùng mới</param>
        /// <returns>
        /// Trả về thông báo nếu cập nhật thành công hoặc lỗi nếu không tìm thấy người dùng.
        /// </returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] Admin updatedUser)
        {
            var user = await _context.Admins.FindAsync(id);
            if (user == null)
                return NotFound("User not found.");


            user.Fullname = updatedUser.Fullname;
            user.Email = updatedUser.Email;
            user.PhoneNumber = updatedUser.PhoneNumber;
            user.Role = updatedUser.Role;
            user.IsVerified = updatedUser.IsVerified;
            if (!string.IsNullOrWhiteSpace(updatedUser.PasswordHash))
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updatedUser.PasswordHash);
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "User updated successfully." });
        }

    }
}
