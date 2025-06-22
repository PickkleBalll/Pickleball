using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Models.admin_login;
using MyApp.Models.learneR;
using MyApp.Services;
using static MyApp.Services.LearnerServices;
using MyApp.Data;

namespace MyApp.Controllers
{
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

        [HttpGet("active")]
        public async Task<IActionResult> GetActiveUsers()
        {
            var activeUsers = await _userService.GetAllActiveUsers();
            return Ok(activeUsers);
        }

        [HttpPut("{id}/set-active-status")]
        public async Task<IActionResult> SetUserActiveStatus(string id, [FromQuery] bool isActive)
        {
            var user = await _userService.SetUserActiveStatus(id, isActive);
            if (user == null)
            {
                return NotFound($"User with ID {id} not found.");
            }
            return Ok(user);
        }
		//[HttpPost("register")]
		//public async Task<IActionResult> Register([FromBody] User user) // ✅ Sửa ở đây
		//{
		//	var createdUser = await _userService.RegisterUser(user); // không đổi
		//	return Ok(createdUser);
		//}

		[HttpPut("update/{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] Learner user)
        {
            var updated = await _userService.SetUserActiveStatus(id, user.IsActive);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUsers([FromBody] Learner profile)
        {
            profile.Id = Guid.NewGuid().ToString();
            profile.CreatedAt = DateTime.UtcNow;
            profile.IsVerified = false;
            profile.IsActive = true;

            _context.Learners.Add(profile);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = profile.Id }, profile);
        }

    }
}
