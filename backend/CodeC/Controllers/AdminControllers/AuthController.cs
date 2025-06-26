using coach.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MyApp.Data;
using MyApp.Models;
using MyApp.Models.admin_login;
using MyApp.Models.learneR;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public AuthController(ApplicationDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (await _dbContext.Admins.AnyAsync(u => u.Email == request.Email))
                return BadRequest("Email already registered.");

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var admin = new Admin
            {
                Id = Guid.NewGuid().ToString(),
                Email = request.Email,
                PasswordHash = hashedPassword,
                Role = string.IsNullOrWhiteSpace(request.Role) ? "User" : request.Role,
                CreatedAt = DateTime.UtcNow,
                IsVerified = false,
                Fullname = request.Fullname,
                PhoneNumber = request.PhoneNumber
            };

            await _dbContext.Admins.AddAsync(admin);

            if (admin.Role.Equals("Learner", StringComparison.OrdinalIgnoreCase))
            {
                var learner = new Learner
                {
                    UserId = admin.Id,
                    FullName = request.Fullname,
                    Email = request.Email,
                    PhoneNumber = request.PhoneNumber,
                    Gender = request.Gender,
                    DateOfBirth = request.DateOfBirth,
                    CreatedAt = DateTime.UtcNow,
                    IsVerified = false
                };
                await _dbContext.Learners.AddAsync(learner);
            }
            else if (admin.Role.Equals("Coach", StringComparison.OrdinalIgnoreCase))
            {
                var coach = new CoachProfile
                {
                    UserId = admin.Id,
                    FullName = request.Fullname,
                    Email = request.Email,
                    PhoneNumber = request.PhoneNumber,
                    Gender = request.Gender,
                    DateOfBirth = request.DateOfBirth,
                    Specialty = request.Specialty,
                    CreatedAt = DateTime.UtcNow,
                    IsVerified = false
                };
                await _dbContext.CoachProfiles.AddAsync(coach);
            }

            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "User registered successfully" });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _dbContext.Admins.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
                return Unauthorized("Invalid email or password.");

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            if (!isPasswordValid)
                return Unauthorized("Invalid email or password.");

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                message = "Login successful",
                token = token,
                user = new
                {
                    user.Id,
                    user.Email,
                    user.Role,
                    user.Fullname,
                    user.PhoneNumber
                }
            });
        }

        private string GenerateJwtToken(Admin user)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var keyString = jwtSettings["Key"];
            var expireMinutes = int.Parse(jwtSettings["ExpireMinutes"] ?? "60");
            if (string.IsNullOrEmpty(keyString))
                throw new InvalidOperationException("JWT Key is not configured.");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Name, user.Fullname),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expireMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    // :white_check_mark: DTO: Request đăng ký người dùng
    public class RegisterRequest
    {
        public string Fullname { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = "User";

        // Thêm cho Learner và Coach
        public string Gender { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }

        // Chỉ dành cho Coach
        public string Specialty { get; set; } = string.Empty;
    }


    // :white_check_mark: DTO: Request đăng nhập
    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}