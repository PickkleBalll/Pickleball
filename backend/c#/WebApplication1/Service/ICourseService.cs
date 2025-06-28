using PickleballCourseAPI.DTOs;

namespace PickleballCourseAPI.Services
{
    public interface ICourseService
    {
        Task<IEnumerable<CourseDto>> GetAllCoursesAsync();
        Task<CourseDto?> GetCourseByIdAsync(string id);
        Task<CourseDto> CreateCourseAsync(string coachId, CreateCourseDto createCourseDto);
        Task<CourseDto> UpdateCourseAsync(string id, UpdateCourseDto updateCourseDto);
        Task<bool> EnrollInCourseAsync(string userId, string courseId);
        Task<IEnumerable<CourseDto>> GetCoursesByCoachAsync(string coachId);
        Task<IEnumerable<CourseDto>> GetEnrolledCoursesAsync(string userId);
    }
}