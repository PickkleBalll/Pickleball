using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Dto;
using MyApp.Models.admin_login;
using MyApp.Models.learneR;
using MyApp.Services;
using System.Security.Claims;
using static MyApp.Services.LearnerServices;

namespace MyApp.Controllers
{
    /// <summary>
    /// API quản lý hồ sơ học viên (Learner Profile).
    /// </summary>
    [ApiController]
    [Route("api/[Controller]")]

    public class LearnerProfilesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly LearnerServices.UserService _userService;

        public LearnerProfilesController(UserService userService, ApplicationDbContext context)
        {
            _userService = userService;
            _context = context;
        }

        //[HttpGet("active")]
        //public async Task<IActionResult> GetActiveUsers()
        //{
        //    var activeUsers = await _userService.GetAllActiveUsers();
        //    return Ok(activeUsers);
        //}

        //[HttpPut("{id}/set-active-status")]
        //public async Task<IActionResult> SetUserActiveStatus(string id, [FromQuery] bool isActive)
        //{
        //    var user = await _userService.SetUserActiveStatus(id, isActive);
        //    if (user == null)
        //    {
        //        return NotFound($"User with ID {id} not found.");
        //    }
        //    return Ok(user);
        //}
        //[HttpPost("register")]
        //public async Task<IActionResult> Register([FromBody] User user) // ✅ Sửa ở đây
        //{
        //	var createdUser = await _userService.RegisterUser(user); // không đổi
        //	return Ok(createdUser);
        //}
        
        /// <summary>
        /// Học viên cập nhật hồ sơ cá nhân của chính mình.
        /// </summary>
        /// <param name="dto">Thông tin cập nhật hồ sơ</param>
        /// <returns>Trả về hồ sơ sau khi cập nhật</returns>
        [Authorize(Roles = "Learner")] // Nếu có phân quyền, còn không thì chỉ [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateMyProfile([FromBody] UpdateLearnerDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("UserId not found in token");

            var learner = await _context.Learners.FirstOrDefaultAsync(l => l.UserId == userId);
            if (learner == null)
                return NotFound("Learner profile not found");

            // Cập nhật thông tin
            learner.FullName = dto.FullName;
            learner.Email = dto.Email;
            learner.PhoneNumber = dto.PhoneNumber;
            learner.Gender = dto.Gender;
            //learner.DateOfBirth = dto.DateOfBirth;

            await _context.SaveChangesAsync();
            return Ok(learner);
        }

        /// <summary>
        /// Lấy hồ sơ học viên theo LearnerId (ID gốc của bảng Learners).
        /// </summary>
        /// <param name="id">ID của học viên</param>
        /// <returns>Hồ sơ học viên nếu tìm thấy</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var learner = await _context.Learners.FindAsync(id); // ✅ Đúng: lấy từ bảng Learners

            if (learner == null) return NotFound();
            return Ok(learner);
        }
        private async Task<string> GenerateNextLearnerId()
        {
            var lastLearner = await _context.Learners
                .OrderByDescending(l => l.Id)
                .FirstOrDefaultAsync();

            int nextNumber = 1;

            if (lastLearner != null && int.TryParse(lastLearner.Id, out var parsed))
            {
                nextNumber = parsed + 1;
            }

            return nextNumber.ToString("D3"); // "001", "002", ...
        }

        /// <summary>
        /// Tạo mới một hồ sơ học viên.
        /// </summary>
        /// <param name="dto">Dữ liệu tạo hồ sơ</param>
        /// <returns>Hồ sơ học viên vừa tạo</returns>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] LearnerCreateDto dto)
        {
            var learner = new Learner
            {
                Id = Guid.NewGuid().ToString(),
                UserId = dto.UserId, // thêm dòng này -- Khi đăng nhập lấy ra userID --> Truyền vào đây thì sẽ thành tự động. Còn logic auth thì b xử lý ạ
                FullName = dto.FullName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                Gender = dto.Gender,
                DateOfBirth = dto.DateOfBirth,
                CreatedAt = DateTime.UtcNow,
                IsVerified = false
            };


            _context.Learners.Add(learner);
            await _context.SaveChangesAsync();

            return Ok(learner); // hoặc return CreatedAtAction(...) nếu muốn chuẩn REST
        }

        /// <summary>
        /// Lấy hồ sơ học viên theo UserId (liên kết với bảng Admin).
        /// </summary>
        /// <param name="userId">ID người dùng trong bảng Admin</param>
        /// <returns>Hồ sơ học viên tương ứng</returns>
        [HttpGet("by-user/{userId}")]
        public async Task<IActionResult> GetLearnerByUserId(string userId)
        {
            var learner = await _context.Learners.FirstOrDefaultAsync(l => l.UserId == userId);
            if (learner == null)
                return NotFound("Learner profile not found for this UserId");

            return Ok(learner);
        }

    }
}
