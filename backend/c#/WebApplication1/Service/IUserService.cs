using PickleballCourseAPI.DTOs;

namespace PickleballCourseAPI.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto?> GetUserByIdAsync(string id);
        Task<UserDto> UpdateUserAsync(string id, UpdateUserDto updateUserDto);
        Task<IEnumerable<UserDto>> GetCoachesAsync();
    }
}