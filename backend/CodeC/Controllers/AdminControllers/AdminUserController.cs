using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Dto;
using MyApp.Models.admin_login;

namespace MyApp.Controllers.admin_login
{
    [ApiController]
    [Route("api/admin/users")]
   // [Authorize(Roles = "Admin")] // Roles = Admin chữ hoa. Trong DB lưu chữ thường thì lỗi nhé ạ. 
    // T note vào cho b nhé. Cách 1 là b sửa thành  [Authorize(Roles = "admin")]. Cách 2 là b tạo thì sẽ phải tạo với role có chữ Admin A viết hoa
    public class AdminUserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminUserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ Lấy toàn bộ user
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Admins
                .Select(u => new
                {
                    u.Id,
                    u.Email,
                    u.Role,
                    u.IsVerified,
                    u.Fullname,
                    u.PhoneNumber
                })
                .ToListAsync();

            return Ok(users);
        }

        // ✅ Xóa user
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _context.Admins.FindAsync(id);
            if (user == null) return NotFound("User not found.");

            _context.Admins.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully." });
        }

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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _context.Admins.FindAsync(id);
            if (user == null)
                return NotFound();

            // Gán lại các field
            user.Fullname = dto.Fullname;
            user.Email = dto.Email;
            user.PhoneNumber = dto.PhoneNumber;
            user.Role = dto.Role;
            user.IsVerified = dto.IsVerified;

            // Nếu PasswordHash có giá trị, mới cập nhật
            if (!string.IsNullOrWhiteSpace(dto.PasswordHash))
            {
                user.PasswordHash = dto.PasswordHash; // Hoặc hash nếu cần
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "User updated successfully" });
        }
    }
}
