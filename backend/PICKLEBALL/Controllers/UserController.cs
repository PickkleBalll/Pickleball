using Microsoft.AspNetCore.Mvc;
using PICKLEBALL.Model;
using PICKLEBALL.Services;
using static PICKLEBALL.Services.UserServices;

namespace PICKLEBALL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserServices.UserService _userService;
        
        public UserController(UserService userService)
        {
            _userService = userService;
        }
        [HttpGet("active")]
        public async Task<IActionResult> GetActiveUsers()
        {
            var activeUsers = await _userService.GetAllActiveUsers();
            return Ok(activeUsers);
        }

        [HttpPut("{id}/set-active-status")]
        public async Task<IActionResult> SetUserActiveStatus(int id, [FromQuery] bool isActive)
        {
            var user = await _userService.SetUserActiveStatus(id, isActive);
            if (user == null)
            {
                return NotFound($"User with ID {id} not found.");
            }
            return Ok(user);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var createdUser = await _userService.RegisterUser(user);
            return Ok(createdUser);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] User user)
        {
            var updated = await _userService.SetUserActiveStatus(id, user.IsActive);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null) return NotFound();
            return Ok(user);
        }
    }
}
