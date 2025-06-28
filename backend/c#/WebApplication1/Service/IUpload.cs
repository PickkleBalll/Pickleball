using PickleballCourseAPI.Models;

namespace PickleballCourseAPI.Services
{
    public interface IUploadService
    {
        Task<Upload> CreateUploadAsync(string userId, IFormFile file, string? description);
        Task<IEnumerable<Upload>> GetUploadsByUserAsync(string userId);
        Task<Upload?> GetUploadByIdAsync(string id);
    }
}