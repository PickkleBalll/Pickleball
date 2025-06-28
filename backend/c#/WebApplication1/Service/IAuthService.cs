using PickleballCourseAPI.DTOs;

namespace PickleballCourseAPI.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
        Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
        Task<bool> UserExistsAsync(string email);
        string HashPassword(string password);
        bool VerifyPassword(string password, string hashedPassword);
    }
}