// Controllers/coach/CoachProfilesController.cs

using coach.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Dto;

namespace MyApp.Controllers.coach
{
    /// <summary>
    /// API quản lý hồ sơ huấn luyện viên (Coach Profile).
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class CoachProfilesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CoachProfilesController(ApplicationDbContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Lấy danh sách toàn bộ huấn luyện viên.
        /// </summary>
        /// <returns>Danh sách CoachProfile</returns>
        // Lấy toàn bộ coach
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CoachProfile>>> GetAll()
        {
            return await _context.CoachProfiles.ToListAsync();
        }
        /// <summary>
        /// Đăng ký trở thành huấn luyện viên mới.
        /// </summary>
        /// <param name="dto">Thông tin đăng ký của huấn luyện viên</param>
        /// <returns>Trả về hồ sơ huấn luyện viên vừa tạo</returns>
        /// <remarks>
        /// Endpoint này dành cho người dùng đăng ký vai trò Coach.
        /// </remarks>
        // API Become a Coach
        [HttpPost("register")]
        public async Task<ActionResult<CoachProfile>> RegisterAsCoach([FromBody] CoachProfileCreateDto dto)
        {
            var coach = new CoachProfile
            {
                // Id sẽ tự sinh bằng Guid.NewGuid().ToString() trong model
                FullName = dto.FullName,
                Specialty = dto.Specialty,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                Gender = dto.Gender,
                DateOfBirth = dto.DateOfBirth
            };

            _context.CoachProfiles.Add(coach);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), new { id = coach.Id }, coach);
        }
        /// <summary>
        /// Cập nhật thông tin hồ sơ huấn luyện viên theo ID.
        /// </summary>
        /// <param name="id">ID của huấn luyện viên cần cập nhật</param>
        /// <param name="dto">Thông tin mới cần cập nhật</param>
        /// <returns>Không trả về nội dung nếu cập nhật thành công</returns>
        // Cập nhật hồ sơ coach
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] CoachProfileUpdateDto dto)
        {
            var coach = await _context.CoachProfiles.FindAsync(id);
            if (coach == null) return NotFound();

            coach.FullName = dto.FullName;
            coach.Specialty = dto.Specialty;
            coach.Email = dto.Email;
            coach.PhoneNumber = dto.PhoneNumber;
            coach.Gender = dto.Gender;
            coach.DateOfBirth = dto.DateOfBirth;

            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
