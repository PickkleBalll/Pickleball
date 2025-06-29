using Microsoft.EntityFrameworkCore;
using PickleballCourseAPI.Data;
using PickleballCourseAPI.DTOs;
using PickleballCourseAPI.Models;

namespace PickleballCourseAPI.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _context.Users.ToListAsync();

            return users.Select(user => new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Role = user.Role,
                IsActive = user.IsActive,
                Phone = user.Phone,
                EmailContact = user.EmailContact,
                Bio = user.Bio,
                CreateAt = user.CreateAt,
                UpdateAt = user.UpdateAt
            });
        }

        public async Task<UserDto?> GetUserByIdAsync(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return null;

            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Role = user.Role,
                IsActive = user.IsActive,
                Phone = user.Phone,
                EmailContact = user.EmailContact,
                Bio = user.Bio,
                CreateAt = user.CreateAt,
                UpdateAt = user.UpdateAt
            };
        }

        public async Task<UserDto> UpdateUserAsync(string id, UpdateUserDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) throw new Exception("User not found");

            // Cập nhật các trường cho phép
            user.Phone = dto.Phone ?? user.Phone;
            user.EmailContact = dto.EmailContact ?? user.EmailContact;
            user.Bio = dto.Bio ?? user.Bio;
            user.IsActive = dto.IsActive ?? user.IsActive;
            user.UpdateAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Role = user.Role,
                IsActive = user.IsActive,
                Phone = user.Phone,
                EmailContact = user.EmailContact,
                Bio = user.Bio,
                CreateAt = user.CreateAt,
                UpdateAt = user.UpdateAt
            };
        }

        public async Task<IEnumerable<UserDto>> GetCoachesAsync()
        {
            var coaches = await _context.Users
                .Where(u => u.Role == UserRole.Coach)
                .ToListAsync();

            return coaches.Select(user => new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Role = user.Role,
                IsActive = user.IsActive,
                Phone = user.Phone,
                EmailContact = user.EmailContact,
                Bio = user.Bio,
                CreateAt = user.CreateAt,
                UpdateAt = user.UpdateAt
            });
        }
    }
}
